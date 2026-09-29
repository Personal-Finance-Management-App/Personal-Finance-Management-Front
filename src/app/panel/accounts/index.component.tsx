"use client";

import { BarChart } from "@mantine/charts";
import { Box, Card, Grid } from "@mantine/core";
import { useTranslations } from "next-intl";
import AccountsSummary from "@/app/panel/accounts/components/AccountsSummary";
import AccountsCard from "@/app/panel/accounts/components/accountsCard/AccountsCard";
import { getGroupedAccounts } from "@/app/panel/accounts/index.helper";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function AccountsPage() {
	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const t = useTranslations();
	const accounts = getTransactionsListQueryData.data ?? [];
	const groupedAccounts = getGroupedAccounts(accounts);
	const chartData = groupedAccounts.map((account) => ({
		...account,
		accountType: t(account.accountType),
	}));
	return (
		<Box px="md">
			<Card
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
				mt={"xl"}
				mb={"md"}
				withBorder
			>
				{" "}
				<BarChart
					h={250}
					data={chartData}
					dataKey="accountType"
					orientation="vertical"
					barProps={{ radius: 6 }}
					gridAxis="none"
					yAxisProps={{ width: 160 }}
					getBarColor={(value) => (value < 0 ? "red.5" : "green.5")}
					series={[{ name: "balance", color: "gray.0" }]}
				/>{" "}
			</Card>
			<Grid mt="xl">
				<AccountsCard accounts={groupedAccounts} />
				<AccountsSummary accounts={accounts} />
			</Grid>
		</Box>
	);
}
