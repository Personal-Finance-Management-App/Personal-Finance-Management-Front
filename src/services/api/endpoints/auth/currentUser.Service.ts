import type { CurrentUserRes, UpdateCurrentUserReq } from "@/services/api/models/auth/currentUser.types";

export async function getCurrentUserApi() {
	const response = await fetch("/api/auth/me");

	return (await response.json()) as CurrentUserRes;
}

export async function updateCurrentUserApi(payload: UpdateCurrentUserReq) {
	const response = await fetch("/api/auth/me", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Failed to update profile");
	}

	return await response.json();
}

export async function logoutApi() {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
	});

	if (!response.ok) {
		throw new Error("Failed to logout");
	}

	return await response.json();
}

export const CurrentUserService = {
	getCurrentUserApi,
	updateCurrentUserApi,
	logoutApi,
};
