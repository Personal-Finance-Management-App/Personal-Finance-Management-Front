import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();

	const sessionId = cookieStore.get("sessionId")?.value;

	if (!sessionId) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	const response = await fetch(`${process.env["BASE_URL"]}/sessions/${sessionId}`, {
		cache: "no-store",
	});

	if (!response.ok) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	const session = await response.json();

	if (session.expiresAt <= Date.now()) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	return NextResponse.json({
		authenticated: true,
		userId: session.userId,
	});
}
