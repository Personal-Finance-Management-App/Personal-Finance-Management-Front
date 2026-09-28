import type { Transaction } from "@/services/api/models/transactions/transactions.types";

export const getGroupedCategories = (transactions: Transaction[]) => {
	const categories = [...new Set(transactions.map((item) => item.category))];

	return categories.map((category) => {
		const groupedTransactions = transactions.filter((item) => item.category === category);

		const income = groupedTransactions
			.filter((item) => item.type === "income")
			.reduce((total, item) => total + item.amount, 0);

		const expense = groupedTransactions
			.filter((item) => item.type === "expense")
			.reduce((total, item) => total + item.amount, 0);

		return {
			category,
			income,
			expense,
		};
	});
};
