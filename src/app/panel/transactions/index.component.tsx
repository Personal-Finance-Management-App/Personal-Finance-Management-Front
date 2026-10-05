"use client";
import {
	Center,
	Group,
	Loader,
	Modal,
	Paper,
	ScrollArea,
	SegmentedControl,
	Table,
	Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ActionButtons from "@/app/panel/components/buttons/ActionButtons";
import AddingButton from "@/app/panel/components/buttons/AddingButton";
import TransactionCardLabels from "@/app/panel/transactions/components/TransactionCardLabels";
import TransactionRow from "@/app/panel/transactions/components/TransactionRow";
import TransactionForm from "@/app/panel/transactions/index.form";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export function TransactionPage() {
	const t = useTranslations("");
	const [transactionId, setTransactionId] = useState<string | undefined>();
	const [modalOpened, modalHandler] = useDisclosure(false);
	const { deleteTransactionData, getTransactionsListQueryData } = useTransactionsQueryApi();

	const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

	if (
		getTransactionsListQueryData.isPending ||
		getTransactionsListQueryData.isFetching ||
		getTransactionsListQueryData.isLoading
	) {
		return (
			<Center>
				<Loader />
			</Center>
		);
	}
	const transactions = getTransactionsListQueryData.data ?? [];

	const filteredTransactions =
		filter === "all" ? transactions : transactions.filter((transaction) => transaction.type === filter);

	return (
		<>
			<AddingButton modalHandler={modalHandler} title={t("AddNewTransaction")} />
			<Modal
				withCloseButton={false}
				closeOnClickOutside={false}
				onClose={modalHandler.close}
				title={transactionId ? t("EditTransaction") : t("AddTransaction")}
				opened={modalOpened}
			>
				<TransactionForm id={transactionId} modalHandler={modalHandler} setTransactionId={setTransactionId} />
			</Modal>

			<Paper
				mx={{ base: "sm", sm: "lg" }}
				radius={"lg"}
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			>
				<Group justify="space-between">
					<SegmentedControl
						mx={{ base: "sm", sm: "lg" }}
						mt={{ base: "sm", sm: "lg" }}
						value={filter}
						onChange={(value) => setFilter(value as "all" | "income" | "expense")}
						data={[
							{ label: t("All"), value: "all" },
							{ label: t("Income"), value: "income" },
							{ label: t("Expenses"), value: "expense" },
						]}
					/>

					<Text size="sm" mx={{ base: "sm", sm: "lg" }} mt={{ base: "sm", sm: "lg" }}>
						{t("TransactionsCount", {
							count: filteredTransactions.length,
						})}
					</Text>
				</Group>
				<ScrollArea my={"md"} mx={"lg"} mb={"sm"} h={{ base: "1000", sm: "800" }} type="auto" mt={"md"}>
					<Table verticalSpacing="md">
						<Table.Thead>
							<TransactionCardLabels />
						</Table.Thead>

						<Table.Tbody>
							{[...filteredTransactions]
								.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
								.map((transaction) => (
									<Table.Tr key={transaction.id}>
										<TransactionRow transaction={transaction} showDate />
										<Table.Td>
											<ActionButtons
												onDelete={() => {
													deleteTransactionData.mutate(transaction.id);
												}}
												onEdit={() => {
													modalHandler.open();
													setTransactionId(transaction.id);
												}}
											/>
										</Table.Td>
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				</ScrollArea>
			</Paper>
		</>
	);
}
