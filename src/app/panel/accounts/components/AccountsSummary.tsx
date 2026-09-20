import { Card, Divider, GridCol, Group, NumberFormatter, Text } from "@mantine/core";
import type { Transaction } from "@/services/api/models/transactions/transactions.types";

type AccountsSummaryProps = {
	accounts: Transaction[];
};
export default function AccountsSummary({ accounts }: AccountsSummaryProps) {
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
				<Group grow>
					<Card padding="md" withBorder>
						<Text mb={"sm"} fw={"bolder"}>
							Financial Summary
						</Text>{" "}
						<Text>
							Total Cash: <NumberFormatter thousandSeparator prefix="$" value={totalCash} />
						</Text>{" "}
						<Divider my="md" />
						<Text>
							Total Income: <NumberFormatter thousandSeparator prefix="$" value={totalIncome} />
						</Text>
						<Divider my="md" />
						<Text>
							Total Expense: <NumberFormatter thousandSeparator prefix="$" value={-totalExpense} />
						</Text>
						<Divider my="md" />
						<Text>
							Total Investment: <NumberFormatter thousandSeparator prefix="$" value={totalInvestment} />
						</Text>{" "}
						<Divider my="md" />
						<Text>
							Total Savings: <NumberFormatter thousandSeparator prefix="$" value={totalSaving} />
						</Text>{" "}
						<Divider my="md" />
						<Text>
							Total Debt: <NumberFormatter thousandSeparator prefix="$" value={totalDebt} />
						</Text>
						<Divider my="md" />
						<Text>
							Total Balance:{" "}
							<Text span c={totalBalance < 0 ? "red.6" : "green.6"}>
								<NumberFormatter thousandSeparator prefix="$" value={totalBalance} />
							</Text>
						</Text>
					</Card>
				</Group>
			</GridCol>
		</>
	);
}
