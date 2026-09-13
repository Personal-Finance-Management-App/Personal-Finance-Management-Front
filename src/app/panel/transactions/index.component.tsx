"use client";
import {
	Autocomplete,
	Box,
	Button,
	Center,
	Group,
	Loader,
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
import { useTranslations } from "next-intl";
import { useState } from "react";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";
import { useTransactionsAccountQueryApi } from "@/app/panel/transactions/(data)/accounts/hooks/index.hooks";
import { useTransactionsCategoryQueryApi } from "@/app/panel/transactions/(data)/categories/hooks/index.hooks";
import { getCategoryColor } from "@/app/panel/transactions/constants/categoryColors";
import { useTransactionsQueryApi } from "@/app/panel/transactions/hooks/index.hooks";
import type {
	Transaction,
	TransactionFormValues,
	TransactionsReq,
} from "@/services/api/models/transactions/transactions.types";

export function TransactionPage() {
	const t = useTranslations("");
	const [editTransaction, setEditTransaction] = useState<Transaction | null>();
	const [modalOpened, modalHandler] = useDisclosure(false);
	const {
		patchUpdateTransactionData,
		deleteTransactionData,
		getTransactionsListQueryData,
		postCreateTransactionMutationData,
	} = useTransactionsQueryApi();
	const { postCreateCategoryMutationData, getTransactionsCategoryListQueryData } =
		useTransactionsCategoryQueryApi();
	const { postCreateAccountMutationData, getTransactionsAccountListQueryData } =
		useTransactionsAccountQueryApi();
	const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
	const form = useForm<TransactionFormValues>({
		initialValues: {
			title: "",
			type: "income",
			category: "",
			account: "",
			date: null,
			amount: 0,
		},
		validate: {
			title: (value) => (value.trim() ? null : t("Title is required")),

			category: (value) => (value.trim() ? null : t("Category is required")),
			date: (value) => (value ? null : t("Date is required")),
		},
	});
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
	const getAccountId = async (AccountName: string) => {
		const categories = getTransactionsAccountListQueryData.data ?? [];

		const existingAccount = categories.find(
			(account) => account.name.toLowerCase() === AccountName.trim().toLowerCase(),
		);

		if (existingAccount) {
			return existingAccount.id;
		}

		const response = await postCreateAccountMutationData.mutateAsync({
			name: AccountName.trim(),
		});

		return response.data.id;
	};

	const handleSubmit = async (values: TransactionFormValues) => {
		const payload: TransactionsReq = {
			title: values.title,
			type: values.type,
			category: values.category,
			account: values.account,
			date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : "",
			amount: values.amount,
		};

		if (editTransaction) {
			await patchUpdateTransactionData.mutateAsync({
				id: editTransaction.id,
				payload,
			});
		} else {
			await getCategoryId(values.category);
			await getAccountId(values.account);
			await postCreateTransactionMutationData.mutateAsync(payload);
		}

		form.reset();
		setEditTransaction(null);
		modalHandler.close();
	};

	const handleEdit = (transaction: Transaction) => {
		setEditTransaction(transaction);

		form.setValues({
			title: transaction.title,
			type: transaction.type,
			category: transaction.category,
			account: transaction.account,
			date: dayjs(transaction.date).toDate(),
			amount: transaction.amount,
		});

		modalHandler.open();
	};
	return (
		<>
			<Group justify={"center"} align={"center"}>
				{" "}
				<Button
					color={"layout"}
					onClick={() => {
						setEditTransaction(null);
						form.reset();
						modalHandler.open();
					}}
					mb={"xl"}
					mt={"xl"}
				>
					{t("Add a new transaction")}
				</Button>
			</Group>
			<Modal
				title={editTransaction ? t("Edit Transaction") : t("Add Transaction")}
				opened={modalOpened}
				onClose={modalHandler.close}
			>
				{" "}
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label={t("Title")} placeholder={t("title place")} {...form.getInputProps("title")} />{" "}
					<Select
						label={t("Type")}
						placeholder={t("Pick a type")}
						data={[
							{ value: "income", label: t("Income") },
							{ value: "expense", label: t("Expense") },
						]}
						{...form.getInputProps("type")}
					></Select>{" "}
					<Autocomplete
						label={t("Category")}
						placeholder={t("Select or type a category")}
						data={getTransactionsCategoryListQueryData.data?.map((category) => category.name) ?? []}
						{...form.getInputProps("category")}
					/>{" "}
					<Autocomplete
						label={t("Account")}
						placeholder={t("Select or type a Account")}
						data={getTransactionsAccountListQueryData.data?.map((account) => account.name) ?? []}
						{...form.getInputProps("account")}
					/>
					<DatePickerInput
						label={t("Select a Date")}
						placeholder={t("Select a Date")}
						{...form.getInputProps("date")}
						presets={[
							{ value: dayjs().subtract(1, "day").format("YYYY-MM-DD"), label: t("Yesterday") },
							{ value: dayjs().format("YYYY-MM-DD"), label: t("Today") },
							{ value: dayjs().add(1, "day").format("YYYY-MM-DD"), label: t("Tomorrow") },

							{ value: dayjs().subtract(1, "month").format("YYYY-MM-DD"), label: t("LastMonth") },
							{ value: dayjs().subtract(1, "year").format("YYYY-MM-DD"), label: t("LastYear") },
						]}
					/>
					<NumberInput
						mt={"sm"}
						label={t("Amount")}
						placeholder={t("amount place")}
						{...form.getInputProps("amount")}
					/>
					<Group justify={"flex-end"} mt={"sm"}>
						{" "}
						<SubmitButton loading={postCreateTransactionMutationData.isPending} />
					</Group>
				</form>
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
										<Box
											w={100}
											px={"sm"}
											py={4}
											bg="light-dark(var(--mantine-color-gray-4), var(--mantine-color-gray-8))"
											style={{ borderRadius: "10px" }}
										>
											<Group gap={6} wrap="nowrap">
												<Box
													w={7}
													h={7}
													bg={getCategoryColor(transaction.category)}
													style={{ borderRadius: "50%" }}
												/>
												{transaction.category}
											</Group>
										</Box>
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
													deleteTransactionData.mutate(transaction.id);
												}}
												size={20}
											></IconTrash>
											<IconEdit
												color="light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4) )"
												onClick={() => handleEdit(transaction)}
												size={20}
											></IconEdit>{" "}
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
