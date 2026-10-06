import { Box, Group, NumberFormatter, Paper, Progress, ScrollArea, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import type { Dispatch, SetStateAction } from "react";
import {
	getCategoryAmount,
	getTotalBudgetAmount,
	getTotalSpentAmount,
} from "@/app/panel/budgets/index.helper";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import ActionButtons from "@/app/panel/components/buttons/ActionButtons";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";
import type { BudgetsRes } from "@/services/api/models/budgets/budgets.types";
import type { Disclosure } from "@/types/GeneralService.types";

type Props = {
	budgetId: string | undefined;
	modalHandler: Disclosure;
	budgetsList: BudgetsRes;
	setBudgetId: Dispatch<SetStateAction<string | undefined>>;
};
export default function BudgetsCard(props: Props) {
	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const transactions = getTransactionsListQueryData.data ?? [];
	const { deleteBudgetsData } = useBudgetsQueryApi();
	const totalBudget = getTotalBudgetAmount(props.budgetsList);
	const t = useTranslations();
	const totalSpent = getTotalSpentAmount(transactions, props.budgetsList);
	return (
		<Paper
			mx={{ base: "sm", sm: "lg" }}
			p={"xl"}
			radius={"lg"}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
		>
			<Text fw={"bold"} fz={"h4"}>
				{t("categoryBudgets")}
			</Text>
			<Box mb={"xl"}>
				<Group mr={"lg"} justify={"space-between"} mt={"lg"}>
					<Text c={"gray.7"}>{t("TotalSpent")}</Text>
					<Text>
						$<NumberFormatter value={totalSpent} thousandSeparator />
						<Text component={"span"} c={"gray.7"}>
							/$
							<NumberFormatter value={totalBudget} thousandSeparator />
						</Text>
					</Text>
				</Group>
				<Progress
					color={"layout.6"}
					mt={"sm"}
					mr={"lg"}
					value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0}
				/>
				{totalSpent > totalBudget && (
					<Text mt={"sm"} c="red" size="sm">
						{t("Overbudget")}$
						<NumberFormatter value={totalSpent - totalBudget} thousandSeparator></NumberFormatter>
					</Text>
				)}
			</Box>
			<ScrollArea h={650}>
				{[...props.budgetsList]
					.sort((a, b) => b.amount - a.amount)
					.map((budget) => (
						<Box mt={"xl"} key={budget.id}>
							<Group justify={"space-between"}>
								{" "}
								<ColoredLabel category={budget.category} />
								<Group mr={"md"}>
									{" "}
									<Text>
										$
										<NumberFormatter
											value={getCategoryAmount(transactions, budget.category)}
											thousandSeparator
										/>
										<Text component="span" c={"gray.7"}>
											/$
											<NumberFormatter value={budget.amount} thousandSeparator />
										</Text>
									</Text>
									<ActionButtons
										onDelete={() => {
											deleteBudgetsData.mutate(budget.id);
										}}
										onEdit={() => {
											props.modalHandler.open();
											props.setBudgetId(budget.id);
										}}
									/>
								</Group>
							</Group>
							<Progress
								mt={"sm"}
								mr={"lg"}
								value={(getCategoryAmount(transactions, budget.category) / budget.amount) * 100}
								color={getLabelColor(budget.category)}
							></Progress>
							{getCategoryAmount(transactions, budget.category) > budget.amount && (
								<Text mt={"sm"} c="red" size="sm">
									{t("Overbudget")} $
									<NumberFormatter
										value={getCategoryAmount(transactions, budget.category) - budget.amount}
										thousandSeparator
									/>
								</Text>
							)}
						</Box>
					))}{" "}
			</ScrollArea>
		</Paper>
	);
}
