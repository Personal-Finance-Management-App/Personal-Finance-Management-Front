"use client";
import { Grid, GridCol, Group, Text } from "@mantine/core";
import {
	IconBuildingBank,
	IconCash,
	IconChartLine,
	IconCreditCardOff,
	IconTrendingDown,
	IconTrendingUp,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { getAccountTotalBalances } from "@/app/panel/accounts/index.helper";
import IncomeVsExpenses from "@/app/panel/overview/components/IncomeVsExpenses";
import RecentTransactions from "@/app/panel/overview/components/RecentTransactions";
import SpentAmountByCategories from "@/app/panel/overview/components/SpentAmountByCategoryies";
import TotalSummaryCard from "@/app/panel/overview/components/TotalSummaryCard";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function OverviewPage() {
	const t = useTranslations();

	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const transactions = getTransactionsListQueryData.data ?? [];
	const { totalIncome, totalExpense, totalBalance, totalInvestment, totalDebt, totalSaving } =
		getAccountTotalBalances(transactions);

	return (
		<Grid>
			<GridCol span={{ base: 12, sm: 6, lg: 3 }}>
				<TotalSummaryCard
					showPrefix
					status={
						<Group gap="xs">
							{totalBalance >= 0 ? <IconTrendingUp color="green" /> : <IconTrendingDown color="red" />}

							<Text size="md" c={totalBalance >= 0 ? "green" : "red.8"}>
								{t("CurrentStatus")}
							</Text>
						</Group>
					}
					value={totalBalance}
					icon={<IconCash size={25} />}
					title={t("TotalBalance")}
				/>
			</GridCol>
			<GridCol span={{ base: 12, sm: 6, lg: 3 }}>
				<TotalSummaryCard
					value={totalInvestment}
					icon={<IconChartLine size={25} />}
					title={t("TotalInvestment")}
				/>
			</GridCol>
			<GridCol span={{ base: 12, sm: 6, lg: 3 }}>
				<TotalSummaryCard value={totalDebt} icon={<IconCreditCardOff size={25} />} title={t("TotalDebt")} />
			</GridCol>
			<GridCol span={{ base: 12, sm: 6, lg: 3 }}>
				<TotalSummaryCard
					value={totalSaving}
					icon={<IconBuildingBank size={25} />}
					title={t("TotalSavings")}
				/>
			</GridCol>
			<GridCol span={{ base: 12, sm: 6 }}>
				<IncomeVsExpenses totalIncome={totalIncome} totalExpense={totalExpense} />
			</GridCol>
			<GridCol span={{ base: 12, sm: 6 }}>
				<SpentAmountByCategories transactions={transactions} />
			</GridCol>
			<GridCol span={{ base: 12 }}>
				<RecentTransactions transactions={transactions} />
			</GridCol>
		</Grid>
	);
}
