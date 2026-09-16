export type Account = {
	id: string;
	name: string;
	options: string[];
};

export type AccountsRes = Account[];

export type AccountsReq = Omit<Account, "id">;
