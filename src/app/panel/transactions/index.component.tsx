"use client";
import {
	Center,
	Group,
	Loader,
	Modal,
	Pagination,
	Paper,
	ScrollArea,
	SegmentedControl,
	Select,
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
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

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
	const sortedTransactions = [...filteredTransactions].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
	const totalPages = Math.ceil(sortedTransactions.length / pageSize);
	const startIndex = (page - 1) * pageSize;
	const currentTransactions = sortedTransactions.slice(startIndex, startIndex + pageSize);

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
						onChange={(value) => {
							setFilter(value as "all" | "income" | "expense");
							setPage(1);
						}}
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
				<ScrollArea my={"md"} mx={"lg"} mb={"sm"} h={{ base: "700", sm: "500" }} type="auto" mt={"md"}>
					<Table stickyHeader verticalSpacing="md">
						<Table.Thead>
							<TransactionCardLabels />
						</Table.Thead>

						<Table.Tbody>
							{currentTransactions.map((transaction) => (
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
				<Group justify="center" mb="sm">
					<Pagination total={totalPages} value={page} onChange={setPage} siblings={1} boundaries={1} />
				</Group>

				<Group px={"md"} justify="space-around" align="center" pb="md">
					{sortedTransactions.length > 0 ? (
						<Text c={"gray.6"} size="sm">
							{t("ShowingTransactions", {
								from: startIndex + 1,
								to: startIndex + currentTransactions.length,
								total: sortedTransactions.length,
							})}
						</Text>
					) : (
						<Text size="sm" c="dimmed">
							{t("NoTransactions")}
						</Text>
					)}

					<Group gap="xs">
						<Text c={"gray.6"} size="sm">
							{t("PageSize")}:
						</Text>

						<Select
							allowDeselect={false}
							data={["5", "10", "20"]}
							value={String(pageSize)}
							onChange={(value) => {
								setPageSize(Number(value));
								setPage(1);
							}}
							w={80}
						/>
					</Group>
				</Group>
			</Paper>
		</>
	);
}
