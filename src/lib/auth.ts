import { cookies } from "next/headers";

export async function getCurrentUser() {
	const cookieStore = await cookies();

	const sessionId = cookieStore.get("sessionId")?.value;

	if (!sessionId) {
		return null;
	}

	const sessionResponse = await fetch(`${process.env["BASE_URL"]}/sessions/${sessionId}`, {
		cache: "no-store",
	});

	if (!sessionResponse.ok) {
		return null;
	}

	const session = await sessionResponse.json();

	if (session.expiresAt <= Date.now()) {
		return null;
	}

	const userResponse = await fetch(`${process.env["BASE_URL"]}/users/${session.userId}`, {
		cache: "no-store",
	});

	if (!userResponse.ok) {
		return null;
	}

	const user = await userResponse.json();

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	};
}
