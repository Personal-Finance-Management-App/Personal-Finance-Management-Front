"use client";

import { Box, Card, NumberFormatter, Text } from "@mantine/core";
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
		<>
			{groupedAccounts.map((account) => (
				<Card ml="md" mr="md" mt="sm" key={account.accountType} padding="sm" withBorder>
					<Card.Section inheritPadding px="md">
						<Text fz="xl">{account.accountType}</Text>

						<Box mt="xs">
							<Text>
								Income: <NumberFormatter thousandSeparator prefix="$" value={account.income} />
							</Text>

							<Text>
								Expense: <NumberFormatter thousandSeparator prefix="$" value={account.expense} />
							</Text>

							<Text>
								Balance: <NumberFormatter thousandSeparator prefix="$" value={account.balance} />
							</Text>
						</Box>

						<Box mt="md">
							{account.groupedAccountsOptionGeneral.map((option) => (
								<Box key={option.accountOption} mt="sm">
									<Text fw={600}>{option.accountOption}</Text>

									<Text>
										Income: <NumberFormatter thousandSeparator prefix="$" value={option.income} />
									</Text>

									<Text>
										Expense: <NumberFormatter thousandSeparator prefix="$" value={option.expense} />
									</Text>

									<Text>
										Balance: <NumberFormatter thousandSeparator prefix="$" value={option.balance} />
									</Text>
								</Box>
							))}
						</Box>
					</Card.Section>
				</Card>
			))}
		</>
	);
}
