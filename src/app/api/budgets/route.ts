import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const response = await fetch(`${process.env["BASE_URL"]}/budgets?userId=${user.id}`, { cache: "no-store" });

	const budgets = await response.json();

	return NextResponse.json(budgets);
}

export async function POST(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const data = await request.json();

	const response = await fetch(`${process.env["BASE_URL"]}/budgets`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...data,
			userId: user.id,
		}),
	});

	const budget = await response.json();

	return NextResponse.json(budget, {
		status: response.status,
	});
}
