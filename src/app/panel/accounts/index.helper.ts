import type { Transaction } from "@/services/api/models/transactions/transactions.types";

export const getGroupedAccounts = (accounts: Transaction[]) => {
	const accountTypes = [...new Set(accounts.map((item) => item.account))];

	return accountTypes.map((accountType) => {
		const groupedTransactions = accounts.filter((item) => item.account === accountType);

		const income = groupedTransactions
			.filter((item) => item.type === "income")
			.reduce((total, item) => total + item.amount, 0);

		const expense = groupedTransactions
			.filter((item) => item.type === "expense")
			.reduce((total, item) => total + item.amount, 0);

		const balance = income - expense;

		return {
			accountType,
			income,
			expense,
			balance,
			groupedAccountsOptionGeneral: getAccountOptions(groupedTransactions),
		};
	});
};
export const getAccountOptions = (groupedTransactions: Transaction[]) => {
	const accountOptions = [...new Set(groupedTransactions.map((item) => item.accountOption))];

	return accountOptions.map((accountOption) => {
		const groupedAccountOption = groupedTransactions.filter((item) => item.accountOption === accountOption);

		const income = groupedAccountOption
			.filter((item) => item.type === "income")
			.reduce((total, item) => total + item.amount, 0);

		const expense = groupedAccountOption
			.filter((item) => item.type === "expense")
			.reduce((total, item) => total + item.amount, 0);

		const balance = income - expense;

		return {
			accountOption,
			income,
			expense,
			balance,
		};
	});
};

export const getAccountTotalBalances = (accounts: Transaction[]) => {
	const totalIncome = accounts
		.filter((item) => item.type === "income")
		.reduce((total, item) => total + item.amount, 0);

	const totalExpense = accounts
		.filter((item) => item.type === "expense")
		.reduce((total, item) => total + item.amount, 0);
	const totalBalance = totalIncome - totalExpense;
	const totalCash = accounts
		.filter((item) => item.account === "Cash")
		.reduce((total, item) => total + item.amount, 0);
	const totalInvestment = accounts
		.filter((item) => item.account === "Investment Account")
		.reduce((total, item) => total + item.amount, 0);
	const totalDebt = accounts
		.filter((item) => item.account === "Loan")
		.reduce((total, item) => total + item.amount, 0);
	const totalSaving = accounts
		.filter((item) => item.account === "Savings Account")
		.reduce((total, item) => total + item.amount, 0);
	return { totalIncome, totalExpense, totalBalance, totalCash, totalInvestment, totalDebt, totalSaving };
};
