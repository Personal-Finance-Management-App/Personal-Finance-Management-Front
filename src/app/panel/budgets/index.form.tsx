import { Group, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import CancelButton from "@/app/panel/components/buttons/CancelButton";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";
import { useTransactionsCategoryQueryApi } from "@/app/panel/transactions/index.hooks";
import type { BudgetsReq } from "@/services/api/models/budgets/budgets.types";
import type { Disclosure } from "@/types/GeneralService.types";

type Props = {
	modalHandler: Disclosure;
};
export default function BudgetsForm(props: Props) {
	const t = useTranslations();
	const { getTransactionsCategoryListQueryData } = useTransactionsCategoryQueryApi();
	const { postBudgetsAPiMutationData } = useBudgetsQueryApi();
	const form = useForm({
		mode: "controlled",
		initialValues: {
			category: "",
			amount: 0,
		},

		validate: {
			category: (value) => (value.trim() ? null : t("CategoryRequired")),
			amount: (value) => (value > 0 ? null : "AmountRequired"),
		},
	});
	const handleCancel = () => {
		form.reset();

		props.modalHandler.close();
	};
	const handleSubmit = async (values: BudgetsReq) => {
		const payload: BudgetsReq = {
			category: values.category,

			amount: values.amount,
		};

		await postBudgetsAPiMutationData.mutateAsync(payload);
		form.reset();
		props.modalHandler.close();
	};
	return (
		<>
			{" "}
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Select
					withAsterisk
					label="Categories"
					placeholder="select a category"
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
					label={"Budget Amount"}
					placeholder={"Enter budget amount"}
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
