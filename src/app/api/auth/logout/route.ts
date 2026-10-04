import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get("sessionId")?.value;

	if (sessionId) {
		await fetch(`${process.env["BASE_URL"]}/sessions/${sessionId}`, {
			method: "DELETE",
		});
	}

	const response = NextResponse.json({
		message: "Logout successful",
	});

	response.cookies.delete("sessionId");

	return response;
}
