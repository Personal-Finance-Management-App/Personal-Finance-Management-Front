export type SignUpFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	terms: boolean;
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
export type SignUpRes = User[];
export type SignUpByIdRes = User;

export type SignUpReq = Omit<User, "id">;
