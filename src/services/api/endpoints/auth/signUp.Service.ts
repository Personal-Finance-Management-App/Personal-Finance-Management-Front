import type { SignUpByIdRes, SignUpReq, SignUpRes } from "@/services/api/models/auth/signUp.types";
import { httpService } from "@/services/httpService";

const SIGNUP_SERVICE_PATH = "/users";

export async function getSignUpListAPi() {
	return await httpService.get<SignUpRes>(SIGNUP_SERVICE_PATH);
}

export async function getSignUpByIdAPi(id: string) {
	return await httpService.get<SignUpByIdRes>(`${SIGNUP_SERVICE_PATH}/${id}`);
}

export async function postSignUpAPi(payload: SignUpReq) {
	const response = await fetch("/api/auth/sign-up", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function updateSignUpAPi(id: string, payload: Partial<SignUpReq>) {
	return await httpService.patch(`${SIGNUP_SERVICE_PATH}/${id}`, payload);
}

export async function deleteSignUpAPi(id: string) {
	return await httpService.delete(`${SIGNUP_SERVICE_PATH}/${id}`);
}

export const SignUpService = {
	getSignUpListAPi,
	getSignUpByIdAPi,
	postSignUpAPi,
	updateSignUpAPi,
	deleteSignUpAPi,
};
