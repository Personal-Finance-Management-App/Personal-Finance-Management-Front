import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const sessionId = request.cookies.get("sessionId")?.value;

	if (!sessionId) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	const sessionResponse = await fetch(`${process.env["BASE_URL"]}/sessions/${sessionId}`, {
		cache: "no-store",
	});

	if (!sessionResponse.ok) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	const session = await sessionResponse.json();

	if (!session.userId) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	if (session.expiresAt <= Date.now()) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/panel/:path*"],
};
