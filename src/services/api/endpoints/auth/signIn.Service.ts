import type { SignInFormValues, SignInRes } from "@/services/api/models/auth/signIn.types";

export async function signInApi(payload: SignInFormValues) {
	const response = await fetch("/api/auth/sign-in", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data: SignInRes = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export const SignInService = {
	signInApi,
};
