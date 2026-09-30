"use client";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BudgetsCard from "@/app/panel/budgets/components/BudgetsCard";
import BudgetsForm from "@/app/panel/budgets/index.form";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import AddingButton from "@/app/panel/components/buttons/AddingButton";

export default function BudgetsPage() {
	const t = useTranslations();
	const [budgetId, setBudgetId] = useState<string | undefined>();
	const [opened, modalHandler] = useDisclosure(false);
	const { getBudgetsListAPiQueryData } = useBudgetsQueryApi();
	const BudgetsList = getBudgetsListAPiQueryData.data ?? [];

	return (
		<>
			<AddingButton title={t("AddBudgetButton")} modalHandler={modalHandler} />
			<Modal
				title={budgetId ? t("EditBudget") : t("AddBudget")}
				withCloseButton={false}
				closeOnClickOutside={false}
				onClose={modalHandler.close}
				opened={opened}
			>
				<BudgetsForm
					setBudgetId={setBudgetId}
					budgetId={budgetId}
					budgetsList={BudgetsList}
					modalHandler={modalHandler}
				/>
			</Modal>
			<BudgetsCard
				budgetId={budgetId}
				budgetsList={BudgetsList}
				modalHandler={modalHandler}
				setBudgetId={setBudgetId}
			/>
		</>
	);
}
