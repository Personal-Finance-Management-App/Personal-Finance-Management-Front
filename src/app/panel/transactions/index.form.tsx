import { Autocomplete, Button, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";
import {
	useTransactionsAccountQueryApi,
	useTransactionsCategoryQueryApi,
	useTransactionsQueryApi,
} from "@/app/panel/transactions/index.hooks";
import type { TransactionFormValues, TransactionsReq } from "@/services/api/models/transactions/index.types";
import type { Disclosure } from "@/types/GeneralService.types";

type Props = {
	id: string | undefined;
	setTransactionId: Dispatch<SetStateAction<string | undefined>>;
	modalHandler: Disclosure;
};

export default function TransactionForm(props: Props) {
	const t = useTranslations("");
	const { postCreateTransactionMutationData, patchUpdateTransactionData, getTransactionsByIdQueryData } =
		useTransactionsQueryApi();
	const { getTransactionsCategoryListQueryData } = useTransactionsCategoryQueryApi();
	const { getTransactionsAccountListQueryData } = useTransactionsAccountQueryApi();

	const form = useForm<TransactionFormValues>({
		mode: "controlled",
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

	const handleCancel = () => {
		form.reset();
		props.setTransactionId(undefined);
		props.modalHandler.close();
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

		if (props.id) {
			await patchUpdateTransactionData.mutateAsync({
				id: props.id as string,
				payload,
			});
		} else {
			// await postCreateCategoryMutationData.mutateAsync({
			//     name: values.category.trim(),
			// });
			// await postCreateAccountMutationData.mutateAsync({
			//     name: values.account.trim(),
			// });
			await postCreateTransactionMutationData.mutateAsync(payload);
		}
		return handleCancel();
	};

	useEffect(() => {
		if (props.id) {
			getTransactionsByIdQueryData.mutateAsync(props.id).then((data) => {
				const transactionFormData = data.data;
				form.setValues({
					title: transactionFormData.title,
					type: transactionFormData.type,
					category: transactionFormData.category,
					account: transactionFormData.account,
					date: dayjs(transactionFormData.date).toDate(),
					amount: transactionFormData.amount,
				});
			});
		}
	}, [props.id]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput label={t("Title")} placeholder={t("title place")} {...form.getInputProps("title")} />
			<Select
				label={t("Type")}
				placeholder={t("Pick a type")}
				data={[
					{ value: "income", label: t("Income") },
					{ value: "expense", label: t("Expense") },
				]}
				{...form.getInputProps("type")}
			></Select>
			<Autocomplete
				label={t("Category")}
				placeholder={t("Select or type a category")}
				data={
					getTransactionsCategoryListQueryData.data?.map((category) => {
						return {
							label: category.name,
							value: category.id,
						};
					}) ?? []
				}
				{...form.getInputProps("category")}
			/>
			<Autocomplete
				label={t("Account")}
				placeholder={t("Select or type a Account")}
				data={
					getTransactionsAccountListQueryData.data?.map((account) => {
						return {
							label: account.name,
							value: account.id,
						};
					}) ?? []
				}
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
				<SubmitButton loading={postCreateTransactionMutationData.isPending} />
				<Button onClick={handleCancel}>Cancel</Button>
			</Group>
		</form>
	);
}
