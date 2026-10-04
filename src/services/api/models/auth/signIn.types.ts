import type { User } from "@/services/api/models/auth/signUp.types";

export type SignInFormValues = {
	email: string;
	password: string;
};
export type SignInRes = {
	message: string;
	user: Omit<User, "password">;
};
