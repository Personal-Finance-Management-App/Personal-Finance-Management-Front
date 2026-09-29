import { NumberFormatter, Table, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import type { TransactionsRes } from "@/services/api/models/transactions/transactions.types";

type Props = {
	transaction: TransactionsRes[number];
	showDate?: boolean;
};
export default function TransactionRow(props: Props) {
	const t = useTranslations();
	return (
		<>
			<Table.Td>
				<Text size="md" fw={600}>
					{props.transaction.title}
				</Text>
			</Table.Td>
			<Table.Td>
				<ColoredLabel category={props.transaction.category} />
			</Table.Td>
			<Table.Td fw="bold">
				{props.transaction.accountOption
					? `${t(props.transaction.account)}-${t(props.transaction.accountOption)}`
					: t(props.transaction.account)}
			</Table.Td>
			{props.showDate && <Table.Td>{props.transaction.date}</Table.Td>}
			<Table.Td fz={"md"} fw={"bold"} c={props.transaction.type === "income" ? "green" : "red.8"}>
				<NumberFormatter
					prefix={props.transaction.type === "income" ? "+$" : "$"}
					value={props.transaction.type === "income" ? props.transaction.amount : -props.transaction.amount}
					thousandSeparator
				></NumberFormatter>
			</Table.Td>
		</>
	);
}
