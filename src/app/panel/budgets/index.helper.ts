import type { Budget } from "@/services/api/models/budgets/budgets.types";
import type { Transaction } from "@/services/api/models/transactions/transactions.types";

export const getCategoryAmount = (transactions: Transaction[], category: string) => {
	return transactions
		.filter((transaction) => transaction.type === "expense" && transaction.category === category)
		.reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTotalBudgetAmount = (budgets: Budget[]) => {
	return budgets.reduce((total, budget) => total + budget.amount, 0);
};

export const getTotalSpentAmount = (transactions: Transaction[], budgets: Budget[]) => {
	return transactions
		.filter(
			(transaction) =>
				transaction.type === "expense" && budgets.some((budget) => budget.category === transaction.category),
		)
		.reduce((total, transaction) => total + transaction.amount, 0);
};
