import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	const budgetResponse = await fetch(`${process.env["BASE_URL"]}/budgets/${id}`, {
		cache: "no-store",
	});

	if (!budgetResponse.ok) {
		return NextResponse.json({ message: "Budget not found" }, { status: 404 });
	}

	const budget = await budgetResponse.json();

	if (budget.userId !== user.id) {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}

	const data = await request.json();

	const response = await fetch(`${process.env["BASE_URL"]}/budgets/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const updatedBudget = await response.json();

	return NextResponse.json(updatedBudget, {
		status: response.status,
	});
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	const budgetResponse = await fetch(`${process.env["BASE_URL"]}/budgets/${id}`, {
		cache: "no-store",
	});

	if (!budgetResponse.ok) {
		return NextResponse.json({ message: "Budget not found" }, { status: 404 });
	}

	const budget = await budgetResponse.json();

	if (budget.userId !== user.id) {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}

	const response = await fetch(`${process.env["BASE_URL"]}/budgets/${id}`, {
		method: "DELETE",
	});

	return NextResponse.json({ message: "Budget deleted successfully" }, { status: response.status });
}
