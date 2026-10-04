export type CurrentUserRes = {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
};
export type UpdateCurrentUserReq = {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
};
