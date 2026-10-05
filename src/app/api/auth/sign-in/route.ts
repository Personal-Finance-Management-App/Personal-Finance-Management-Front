import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const response = await fetch(`${process.env["BASE_URL"]}/users?email=${encodeURIComponent(email)}`);

	const users = await response.json();

	const user = users[0];

	if (!user || user.password !== password) {
		return NextResponse.json({ message: "InvalidCredentials" }, { status: 401 });
	}

	let sessionId = request.headers.get("cookie")?.match(/sessionId=([^;]+)/)?.[1];

	if (sessionId) {
		const sessionResponse = await fetch(`${process.env["BASE_URL"]}/sessions/${sessionId}`);

		if (sessionResponse.ok) {
			const session = await sessionResponse.json();

			const isValidSession = session.userId === user.id && session.expiresAt > Date.now();

			if (!isValidSession) {
				sessionId = undefined;
			}
		} else {
			sessionId = undefined;
		}
	}

	if (!sessionId) {
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

		sessionId = session.id;
	}

	if (!sessionId) {
		return NextResponse.json({ message: "FailedToCreateSession" }, { status: 500 });
	}

	const result = NextResponse.json({
		message: "Sign in successful",
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
	});

	result.cookies.set("sessionId", sessionId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 2 * 24 * 60 * 60,
		path: "/",
	});

	return result;
}
