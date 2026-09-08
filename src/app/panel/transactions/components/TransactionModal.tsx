"use client";
import {
	Autocomplete,
	Box,
	Button,
	Group,
	Modal,
	NumberInput,
	Paper,
	ScrollArea,
	SegmentedControl,
	Select,
	Table,
	Text,
	TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import dayjs from "dayjs";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";
import { useTransactionsCategoryQueryApi } from "@/app/panel/transactions/(categories)/hooks/index.hooks";
import { getCategoryColor } from "@/app/panel/transactions/constants/categoryColors";
import { useTransactionsQueryApi } from "@/app/panel/transactions/hooks/index.hooks";
import type { TransactionFormValues, TransactionsReq } from "@/services/api/models/transactions/index.types";

export function TransactionModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const { getTransactionsListQueryData, postCreateTransactionMutationData } = useTransactionsQueryApi();
	const { postCreateCategoryMutationData, getTransactionsCategoryListQueryData } =
		useTransactionsCategoryQueryApi();
	const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

	const transactions = getTransactionsListQueryData.data ?? [];

	const filteredTransactions =
		filter === "all" ? transactions : transactions.filter((transaction) => transaction.type === filter);
	const getCategoryId = async (categoryName: string) => {
		const categories = getTransactionsCategoryListQueryData.data ?? [];

		const existingCategory = categories.find(
			(category) => category.name.toLowerCase() === categoryName.trim().toLowerCase(),
		);

		if (existingCategory) {
			return existingCategory.id;
		}

		const response = await postCreateCategoryMutationData.mutateAsync({
			name: categoryName.trim(),
		});

		return response.data.id;
	};

	const handleSubmit = async (values: TransactionFormValues) => {
		await getCategoryId(values.category);
		const payload: TransactionsReq = {
			title: values.title,
			type: values.type,
			category: values.category,
			account: values.account,
			date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : "",
			amount: values.amount,
		};
		await postCreateTransactionMutationData.mutateAsync(payload);
		await getTransactionsListQueryData.refetch();

		form.reset();

		close();
	};
	const form = useForm<TransactionFormValues>({
		initialValues: {
			title: "",
			type: "expense",
			category: "",
			account: "",
			date: null,
			amount: 0,
		},
	});

	return (
		<>
			<Button variant="default" onClick={open} mt={"md"} ml={"sm"}>
				Add a new transaction
			</Button>
			<Modal opened={opened} onClose={close}>
				{" "}
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label="Title" placeholder="title" {...form.getInputProps("title")} />{" "}
					<Select
						label="Type"
						placeholder="Pick a type"
						data={[
							{ value: "income", label: "Income" },
							{ value: "expense", label: "Expense" },
						]}
						{...form.getInputProps("type")}
					></Select>{" "}
					<Autocomplete
						label="Category"
						placeholder="Select or type a category"
						data={getTransactionsCategoryListQueryData.data?.map((category) => category.name) ?? []}
						{...form.getInputProps("category")}
					/>
					<TextInput label="Account" placeholder="account" {...form.getInputProps("account")} />
					<DatePickerInput
						label="Select a Date"
						placeholder="Select date"
						{...form.getInputProps("date")}
						presets={[
							{ value: dayjs().subtract(1, "day").format("YYYY-MM-DD"), label: "Yesterday" },
							{ value: dayjs().format("YYYY-MM-DD"), label: "Today" },
							{ value: dayjs().add(1, "day").format("YYYY-MM-DD"), label: "Tomorrow" },

							{ value: dayjs().subtract(1, "month").format("YYYY-MM-DD"), label: "Last month" },
							{ value: dayjs().subtract(1, "year").format("YYYY-MM-DD"), label: "Last year" },
						]}
					/>
					<NumberInput mt={"sm"} label="Amount" placeholder="amount" {...form.getInputProps("amount")} />
					<Group justify={"flex-end"} mt={"sm"}>
						{" "}
						<SubmitButton />
					</Group>
				</form>
			</Modal>
			<Paper mt={"md"} mx={"sm"} radius={"lg"}>
				<Group justify="space-between" px="sm" mt="sm">
					<SegmentedControl
						mt={"sm"}
						value={filter}
						onChange={(value) => setFilter(value as "all" | "income" | "expense")}
						data={[
							{ label: "All", value: "all" },
							{ label: "Income", value: "income" },
							{ label: "Expenses", value: "expense" },
						]}
					/>

					<Text size="sm">{filteredTransactions.length} Transactions</Text>
				</Group>
				<ScrollArea h={{ base: "1000", sm: "500" }} type="auto" mt={"md"}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Title</Table.Th>

								<Table.Th>Category</Table.Th>
								<Table.Th>Account</Table.Th>
								<Table.Th>Date</Table.Th>
								<Table.Th>Amount</Table.Th>
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{filteredTransactions.map((transaction) => (
								<Table.Tr key={transaction.id}>
									<Table.Td>{transaction.title}</Table.Td>
									<Table.Td ta="center">
										<Group gap={6} justify="center" wrap="nowrap">
											<Box
												w={7}
												h={7}
												bg={getCategoryColor(transaction.category)}
												style={{ borderRadius: "50%" }}
											/>
											{transaction.category}
										</Group>
									</Table.Td>
									<Table.Td>{transaction.account}</Table.Td>
									<Table.Td>{transaction.date}</Table.Td>
									<Table.Td c={transaction.type === "income" ? "green" : "red"}>
										{transaction.type === "income" ? `+$${transaction.amount}` : `-$${transaction.amount}`}
									</Table.Td>
									<Table.Td>
										<Group justify="center" gap="xs" wrap="nowrap">
											{" "}
											<IconTrash color={"red"} size={16}></IconTrash>
											<IconEdit size={16}></IconEdit>{" "}
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
