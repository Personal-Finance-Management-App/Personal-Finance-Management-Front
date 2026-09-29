"use client";
import { Grid } from "@mantine/core";
import { getGroupedAccounts } from "@/app/panel/accounts/index.helper";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import AccountSpentAmount from "@/app/panel/reports/components/AccountSpentAmount";
import AccountsIncome from "@/app/panel/reports/components/AccountsIncome";
import BudgetsReport from "@/app/panel/reports/components/BudgetsReport";
import CategorySpentAmount from "@/app/panel/reports/components/CategorySpentAmount";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function ReportsPage() {
	const { getBudgetsListAPiQueryData } = useBudgetsQueryApi();
	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const transactions = getTransactionsListQueryData.data ?? [];
	const BudgetsList = getBudgetsListAPiQueryData.data ?? [];
	const groupedAccounts = getGroupedAccounts(transactions);

	return (
		<Grid>
			<Grid.Col span={{ base: 12, md: 6 }} h={500} style={{ overflowY: "auto" }}>
				{" "}
				<CategorySpentAmount transactions={transactions} />
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 6 }} h={500} style={{ overflowY: "auto" }}>
				<BudgetsReport BudgetsList={BudgetsList} />
			</Grid.Col>{" "}
			<Grid.Col span={{ base: 12, md: 6 }} h={500} style={{ overflowY: "auto" }}>
				{" "}
				<AccountSpentAmount groupedAccounts={groupedAccounts} />
			</Grid.Col>{" "}
			<Grid.Col span={{ base: 12, md: 6 }} h={500} style={{ overflowY: "auto" }}>
				<AccountsIncome groupedAccounts={groupedAccounts} />{" "}
			</Grid.Col>
		</Grid>
	);
}
