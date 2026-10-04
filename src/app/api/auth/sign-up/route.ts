import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { firstName, lastName, email, password } = await request.json();

	const usersResponse = await fetch(`${process.env["BASE_URL"]}/users?email=${encodeURIComponent(email)}`);

	const users = await usersResponse.json();

	if (users.length > 0) {
		return NextResponse.json({ message: "Email already exists" }, { status: 409 });
	}

	const userResponse = await fetch(`${process.env["BASE_URL"]}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			password,
		}),
	});

	const user = await userResponse.json();

	const sessionResponse = await fetch(`${process.env["BASE_URL"]}/sessions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userId: user.id,
			expiresAt: Date.now() + 2 * 24 * 60 * 60 * 1000,
		}),
	});

	const session = await sessionResponse.json();

	const response = NextResponse.json({
		message: "Sign up successful",
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
	});

	response.cookies.set("sessionId", session.id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 2 * 24 * 60 * 60,
		path: "/",
	});

	return response;
}
