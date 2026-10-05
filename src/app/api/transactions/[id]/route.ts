import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	const transactionResponse = await fetch(`${process.env["BASE_URL"]}/transactions/${id}`, {
		cache: "no-store",
	});

	if (!transactionResponse.ok) {
		return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
	}

	const transaction = await transactionResponse.json();

	if (transaction.userId !== user.id) {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}

	const data = await request.json();

	const response = await fetch(`${process.env["BASE_URL"]}/transactions/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const updatedTransaction = await response.json();

	return NextResponse.json(updatedTransaction, {
		status: response.status,
	});
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	const transactionResponse = await fetch(`${process.env["BASE_URL"]}/transactions/${id}`, {
		cache: "no-store",
	});

	if (!transactionResponse.ok) {
		return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
	}

	const transaction = await transactionResponse.json();

	if (transaction.userId !== user.id) {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}

	const response = await fetch(`${process.env["BASE_URL"]}/transactions/${id}`, {
		method: "DELETE",
	});

	return NextResponse.json({ message: "Transaction deleted successfully" }, { status: response.status });
}
