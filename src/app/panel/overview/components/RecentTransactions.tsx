import { Group, Paper, Table, Text } from "@mantine/core";
import { IconTransactionDollar } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import ViewAllButton from "@/app/panel/components/buttons/ViewAll";
import TransactionRow from "@/app/panel/transactions/components/TransactionRow";
import type { TransactionsRes } from "@/services/api/models/transactions/transactions.types";

type Props = {
	transactions: TransactionsRes;
};
export default function RecentTransactions(props: Props) {
	const t = useTranslations();

	return (
		<Paper
			mb={"sm"}
			mx={{ base: "sm", sm: "lg" }}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			p="lg"
			radius="lg"
		>
			<Group mb={"lg"}>
				<IconTransactionDollar size={25} />
				<Text fz={"h4"} fw={"bold"}>
					{t("RecentActivity")}
				</Text>
			</Group>
			{props.transactions.length > 0 ? (
				<Table.ScrollContainer minWidth={700}>
					<Table verticalSpacing="md">
						<Table.Tbody>
							{[...props.transactions]
								.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
								.slice(0, 5)
								.map((transaction) => (
									<Table.Tr key={transaction.id}>
										<TransactionRow transaction={transaction} showDate={false} />
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			) : (
				<Text c="dimmed" ta="center" py="xl">
					{t("NoDataAvailable")}
				</Text>
			)}
			<ViewAllButton href="/panel/transactions" />
		</Paper>
	);
}
