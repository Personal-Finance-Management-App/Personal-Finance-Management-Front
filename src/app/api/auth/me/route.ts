import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
	const user = await getCurrentUser();

	return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const data = await request.json();

	const response = await fetch(`${process.env["BASE_URL"]}/users/${user.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const updatedUser = await response.json();

	return NextResponse.json(updatedUser, {
		status: response.status,
	});
}
