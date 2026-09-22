import { Box, Card, Divider, GridCol, Group, NumberFormatter, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import type { Transaction } from "@/services/api/models/transactions/transactions.types";

type AccountsSummaryProps = {
	accounts: Transaction[];
};
export default function AccountsSummary({ accounts }: AccountsSummaryProps) {
	const t = useTranslations();
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
	return (
		<>
			{" "}
			<GridCol span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
				<Card
					bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
					padding="md"
					withBorder
				>
					<Text fw={600} fz="lg">
						{t("FinancialSummary")}
					</Text>

					<Box mt="lg">
						<Text size="sm" c="gray.7">
							{t("TotalBalance")}
						</Text>

						<Text fz="xl" fw={700} c={totalBalance < 0 ? "red.6" : "green.6"}>
							<NumberFormatter thousandSeparator prefix="$" value={totalBalance} />
						</Text>
					</Box>

					<Divider my="md" />

					<Stack gap="sm">
						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalCash")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={totalCash} />
							</Text>
						</Group>

						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalIncome")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={totalIncome} />
							</Text>
						</Group>

						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalExpense")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={-totalExpense} />
							</Text>
						</Group>
					</Stack>

					<Divider my="md" />

					<Stack gap="sm">
						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalInvestment")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={totalInvestment} />
							</Text>
						</Group>

						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalSavings")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={totalSaving} />
							</Text>
						</Group>

						<Group justify="space-between">
							<Text size="sm" c="gray.7">
								{t("TotalDebt")}
							</Text>

							<Text fw={500}>
								<NumberFormatter thousandSeparator prefix="$" value={-totalDebt} />
							</Text>
						</Group>
					</Stack>
				</Card>
			</GridCol>
		</>
	);
}
