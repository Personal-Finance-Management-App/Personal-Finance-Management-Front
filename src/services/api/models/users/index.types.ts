export type User = {
	id: string;
	userName: string;
	name: string;
	email: string;
	phoneNumber: string;
	age: number;
	createdAt: string;
	avatar?: string;
};

export type UsersRs = User[];

export type UsersRq = Omit<User, "id" | "createdAt">;
