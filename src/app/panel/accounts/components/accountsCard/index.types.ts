export type AccountOption = {
	accountOption: string;
	income: number;
	expense: number;
	balance: number;
};

export type GroupedAccount = {
	accountType: string;
	income: number;
	expense: number;
	balance: number;
	groupedAccountsOptionGeneral: AccountOption[];
};

export type AccountsCardProps = {
	accounts: GroupedAccount[];
};
