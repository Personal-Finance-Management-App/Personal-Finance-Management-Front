"use client";

import { BarChart } from "@mantine/charts";
import { Box, Grid } from "@mantine/core";
import AccountsSummary from "@/app/panel/accounts/components/AccountsSummary";
import AccountsCard from "@/app/panel/accounts/components/accountsCard/AccountsCard";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function AccountsPage() {
	const { getTransactionsListQueryData } = useTransactionsQueryApi();

	const accounts = getTransactionsListQueryData.data ?? [];
	const accountTypes = [...new Set(accounts.map((item) => item.account))];
	const groupedAccounts = accountTypes.map((accountType) => {
		const groupedTransactions = accounts.filter((item) => item.account === accountType);

		const income = groupedTransactions
			.filter((item) => item.type === "income")
			.reduce((total, item) => total + item.amount, 0);

		const expense = groupedTransactions
			.filter((item) => item.type === "expense")
			.reduce((total, item) => total + item.amount, 0);

		const balance = income - expense;

		const accountOptions = [...new Set(groupedTransactions.map((item) => item.accountOption))];

		const groupedAccountsOptionGeneral = accountOptions.map((accountOption) => {
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

		return {
			accountType,
			income,
			expense,
			balance,
			groupedAccountsOptionGeneral,
		};
	});

	return (
		<Box px="md">
			<BarChart
				mt="md"
				h={250}
				data={groupedAccounts}
				dataKey="accountType"
				orientation="vertical"
				barProps={{ radius: 5 }}
				gridAxis="none"
				yAxisProps={{ width: 140 }}
				getBarColor={(value) => (value < 0 ? "red.5" : "green.5")}
				series={[{ name: "balance", color: "gray.0" }]}
			/>{" "}
			<Grid mt="lg">
				<AccountsCard accounts={groupedAccounts} />
				<AccountsSummary accounts={accounts} />
			</Grid>
		</Box>
	);
}
