export type Transaction = {
	id: string;
	userId: string;
	title: string;
	type: "income" | "expense";
	date: string;
	amount: number;
	category: string;
	account: string;
	accountOption: string;
};
export type TransactionFormValues = {
	title: string;
	type: "income" | "expense";
	category: string;
	account: string;
	accountOption: string;
	date: Date | null;
	amount: number;
};
export type TransactionsRes = Transaction[];

export type TransactionsByIdRes = Transaction;

export type TransactionsReq = Omit<Transaction, "id" | "userId">;
