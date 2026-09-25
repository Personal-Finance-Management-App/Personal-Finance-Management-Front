import type { Transaction } from "@/services/api/models/transactions/transactions.types";

export const getCategoryAmount = (transactions: Transaction[], category: string) => {
	return transactions
		.filter((transaction) => transaction.category === category)
		.reduce((total, transaction) => total + transaction.amount, 0);
};
