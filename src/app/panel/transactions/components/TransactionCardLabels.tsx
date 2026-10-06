import { Table } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function TransactionCardLabels() {
	const t = useTranslations();
	return (
		<Table.Tr>
			<Table.Th fz="md" fw={"bold"}>
				{t("Title")}
			</Table.Th>
			<Table.Th fz="md" fw={"bold"}>
				{t("Category")}
			</Table.Th>
			<Table.Th fz="md" fw={"bold"}>
				{t("Account")}
			</Table.Th>
			<Table.Th fz="md" fw={"bold"}>
				{t("Date")}
			</Table.Th>
			<Table.Th fz="md" fw={"bold"}>
				{t("Amount")}
			</Table.Th>
			<Table.Th fz="md" fw={"bold"}></Table.Th>
		</Table.Tr>
	);
}
