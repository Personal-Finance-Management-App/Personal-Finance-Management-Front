"use client";
import {
	Button,
	Center,
	Flex,
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
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TransactionCategory from "@/app/panel/transactions/components/transactionCategory";
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
			<Flex justify={"center"} align={"center"}>
				<Button color={"layout"} onClick={modalHandler.open} mb={"xl"} mt={"xl"}>
					{t("AddNewTransaction")}
				</Button>
			</Flex>
			<Modal
				withCloseButton={false}
				closeOnClickOutside={false}
				onClose={modalHandler.close}
				title={transactionId ? t("Edit Transaction") : t("Add Transaction")}
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
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{filteredTransactions.map((transaction) => (
								<Table.Tr key={transaction.id}>
									<Table.Td>
										{" "}
										<Text size="md" fw={600}>
											{transaction.title}
										</Text>
									</Table.Td>
									<Table.Td>
										<TransactionCategory category={transaction.category} />
									</Table.Td>
									<Table.Td fw={"bold"}>{transaction.account}</Table.Td>
									<Table.Td>{transaction.date}</Table.Td>
									<Table.Td fz={"md"} fw={"bold"} c={transaction.type === "income" ? "green" : "red.8"}>
										{transaction.type === "income" ? `+$${transaction.amount}` : `-$${transaction.amount}`}
									</Table.Td>
									<Table.Td>
										<Group justify="center" gap="xs" wrap="nowrap">
											{" "}
											<IconTrash
												color="light-dark(var(--mantine-color-red-6), var(--mantine-color-red-5) )"
												onClick={() => {
													deleteTransactionData.mutate(transaction.id, {
														onSuccess: () => {
															notifications.show({
																title: t("Deleted"),
																message: t("Transaction deleted successfully"),
																color: "green",
															});
														},
														onError: () => {
															notifications.show({
																title: t("Error"),
																message: t("Failed to delete transaction"),
																color: "red",
															});
														},
													});
												}}
												size={20}
											></IconTrash>
											<IconEdit
												color="light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4) )"
												onClick={() => {
													modalHandler.open();
													setTransactionId(transaction.id);
												}}
												size={20}
											></IconEdit>
										</Group>
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
