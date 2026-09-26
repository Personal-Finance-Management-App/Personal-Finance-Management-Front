import { Group, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import CancelButton from "@/app/panel/components/buttons/CancelButton";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";
import { useTransactionsCategoryQueryApi } from "@/app/panel/transactions/index.hooks";
import type { BudgetsReq, BudgetsRes } from "@/services/api/models/budgets/budgets.types";
import type { Disclosure } from "@/types/GeneralService.types";

type Props = {
	budgetId: string | undefined;
	modalHandler: Disclosure;
	budgetsList: BudgetsRes;
	setBudgetId: Dispatch<SetStateAction<string | undefined>>;
};
export default function BudgetsForm(props: Props) {
	const t = useTranslations();
	const { getTransactionsCategoryListQueryData } = useTransactionsCategoryQueryApi();
	const { getBudgetsByIdAPiQueryData, postBudgetsAPiMutationData, updateBudgetsAPiData } =
		useBudgetsQueryApi();
	const form = useForm({
		mode: "controlled",
		initialValues: {
			category: "",
			amount: 0,
		},

		validate: {
			category: (value) => (value.trim() ? null : t("CategoryRequired")),
			amount: (value) => (value > 0 ? null : t("AmountRequired")),
		},
	});
	const handleCancel = () => {
		form.reset();
		props.setBudgetId(undefined);
		props.modalHandler.close();
	};
	const handleSubmit = async (values: BudgetsReq) => {
		const payload: BudgetsReq = {
			category: values.category,
			amount: values.amount,
		};

		if (props.budgetId) {
			const isCategoryAlreadyBudgeted = props.budgetsList.some(
				(budget) => budget.category === values.category && budget.id !== props.budgetId,
			);

			if (isCategoryAlreadyBudgeted) {
				notifications.show({
					title: t("AlreadyExists"),
					message: t("ExistsMessage"),
					color: "red",
				});

				return;
			}

			await updateBudgetsAPiData.mutateAsync({
				id: props.budgetId,
				payload,
			});
		} else {
			const isCategoryAlreadyBudgeted = props.budgetsList.some(
				(budget) => budget.category === values.category,
			);

			if (isCategoryAlreadyBudgeted) {
				notifications.show({
					title: t("AlreadyExists"),
					message: t("ExistsMessage"),
					color: "red",
				});

				return;
			}

			await postBudgetsAPiMutationData.mutateAsync(payload);
		}

		return handleCancel();
	};
	useEffect(() => {
		if (props.budgetId) {
			getBudgetsByIdAPiQueryData.mutateAsync(props.budgetId).then((data) => {
				const budgetFormData = data.data;
				form.setValues({
					category: budgetFormData.category,
					amount: budgetFormData.amount,
				});
			});
		}
	}, [props.budgetId]);
	return (
		<>
			{" "}
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Select
					withAsterisk
					label={t("Category")}
					placeholder={t("SelectCategory")}
					allowDeselect={false}
					data={
						getTransactionsCategoryListQueryData.data?.map((category) => {
							return {
								label: category.name,
								value: category.name,
							};
						}) ?? []
					}
					{...form.getInputProps("category")}
				></Select>
				<NumberInput
					mt={"md"}
					withAsterisk
					label={t("BudgetAmount")}
					placeholder={t("EnterBudgetAmount")}
					{...form.getInputProps("amount")}
				></NumberInput>
				<Group justify={"space-between"} mt={"md"}>
					<SubmitButton loading={postBudgetsAPiMutationData.isPending} />
					<CancelButton handleCancel={handleCancel} />
				</Group>
			</form>
		</>
	);
}
