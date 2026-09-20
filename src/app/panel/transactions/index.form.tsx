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
import type {
	TransactionFormValues,
	TransactionsReq,
} from "@/services/api/models/transactions/transactions.types";
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
			accountOption: "",
			date: null,
			amount: 0,
		},
		validate: {
			title: (value) => (value.trim() ? null : t("TitleRequired")),
			category: (value) => (value.trim() ? null : t("CategoryRequired")),
			account: (value) => (value.trim() ? null : t("AccountRequired")),

			date: (value) => (value ? null : t("DateRequired")),
		},
	});
	const selectedAccount = getTransactionsAccountListQueryData.data?.find(
		(account) => account.name === form.values.account,
	);
	const handleCancel = () => {
		form.reset();
		props.setTransactionId(undefined);
		props.modalHandler.close();
	};

	const handleSubmit = async (values: TransactionFormValues) => {
		if (selectedAccount && selectedAccount.options.length > 0 && !values.accountOption?.trim()) {
			form.setFieldError("accountOption", t("AccountNameRequired"));
			return;
		}
		const payload: TransactionsReq = {
			title: values.title,
			type: values.type,
			category: values.category,
			account: values.account,
			accountOption: values.accountOption,
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
					accountOption: transactionFormData.accountOption,
					date: dayjs(transactionFormData.date).toDate(),
					amount: transactionFormData.amount,
				});
			});
		}
	}, [props.id]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput label={t("Title")} placeholder={t("TitlePlace")} {...form.getInputProps("title")} />
			<Select
				mt={"sm"}
				label={t("Type")}
				placeholder={t("PickType")}
				allowDeselect={false}
				data={[
					{ value: "income", label: t("Income") },
					{ value: "expense", label: t("Expense") },
				]}
				{...form.getInputProps("type")}
			></Select>
			<Autocomplete
				mt={"sm"}
				label={t("Category")}
				placeholder={t("SelectCategory")}
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
				mt={"sm"}
				label={t("AccountType")}
				placeholder={t("SelectAccount")}
				data={
					getTransactionsAccountListQueryData.data?.map((account) => {
						return {
							label: t(account.name),
							value: account.id,
						};
					}) ?? []
				}
				{...form.getInputProps("account")}
			/>
			{selectedAccount && selectedAccount.options.length > 0 && (
				<Select
					mt={"sm"}
					label={t("AccountName")}
					placeholder={t("SelectAccountName")}
					data={selectedAccount.options.map((option) => ({
						label: t(option),
						value: option,
					}))}
					{...form.getInputProps("accountOption")}
				/>
			)}
			<DatePickerInput
				mt={"sm"}
				maxDate={dayjs().toDate()}
				label={t("SelectDate")}
				placeholder={t("SelectDate")}
				{...form.getInputProps("date")}
				presets={[
					{ value: dayjs().subtract(1, "day").format("YYYY-MM-DD"), label: t("Yesterday") },
					{ value: dayjs().format("YYYY-MM-DD"), label: t("Today") },

					{ value: dayjs().subtract(1, "month").format("YYYY-MM-DD"), label: t("LastMonth") },
					{ value: dayjs().subtract(1, "year").format("YYYY-MM-DD"), label: t("LastYear") },
				]}
			/>
			<NumberInput
				mt={"sm"}
				label={t("Amount")}
				placeholder={t("AmountPlace")}
				{...form.getInputProps("amount")}
			/>
			<Group justify={"space-between"} mt={"md"}>
				<SubmitButton loading={postCreateTransactionMutationData.isPending} />
				<Button bg={"layout"} onClick={handleCancel}>
					{t("Cancel")}
				</Button>
			</Group>
		</form>
	);
}
