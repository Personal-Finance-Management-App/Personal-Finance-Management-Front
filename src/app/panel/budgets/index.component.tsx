"use client";
import { Box, Button, Flex, Group, Modal, Paper, Progress, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BudgetsForm from "@/app/panel/budgets/index.form";
import { getCategoryAmount } from "@/app/panel/budgets/index.helper";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import TransactionCategory from "@/app/panel/transactions/components/transactionCategory";
import { getCategoryColor } from "@/app/panel/transactions/components/transactionCategory/index.helper";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function BudgetsPage() {
	const t = useTranslations();
	const [budgetId, setBudgetId] = useState<string | undefined>();
	const [opened, modalHandler] = useDisclosure(false);
	const { getBudgetsListAPiQueryData, deleteBudgetsData } = useBudgetsQueryApi();
	const BudgetsList = getBudgetsListAPiQueryData.data ?? [];
	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const transactions = getTransactionsListQueryData.data ?? [];
	return (
		<>
			<Flex mb={"md"} mt={"md"} justify={"center"} align={"center"}>
				<Button color={"layout"} variant="filled" onClick={modalHandler.open}>
					{t("AddBudgetButton")}
				</Button>
			</Flex>
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
			<Paper
				mx={{ base: "sm", sm: "lg" }}
				p={"md"}
				radius={"lg"}
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			>
				<Text fw={"bold"} fz={"h4"}>
					{t("categoryBudgets")}
				</Text>
				{BudgetsList.map((budget) => (
					<Box mt={"md"} key={budget.id}>
						<Group justify={"space-between"}>
							{" "}
							<TransactionCategory category={budget.category} />
							<Group mr={"md"}>
								{" "}
								<Text>
									${getCategoryAmount(transactions, budget.category)}{" "}
									<Text component="span" c={"gray.7"}>
										/${budget.amount}
									</Text>
								</Text>
								<Group justify="center" gap="xs" wrap="nowrap">
									{" "}
									<IconTrash
										style={{ cursor: "pointer" }}
										color="light-dark(var(--mantine-color-red-6), var(--mantine-color-red-5) )"
										onClick={() => {
											deleteBudgetsData.mutate(budget.id);
										}}
										size={20}
									></IconTrash>
									<IconEdit
										style={{ cursor: "pointer" }}
										color="light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4) )"
										onClick={() => {
											modalHandler.open();
											setBudgetId(budget.id);
										}}
										size={20}
									></IconEdit>
								</Group>
							</Group>
						</Group>
						<Progress
							mt={"sm"}
							mr={"lg"}
							value={(getCategoryAmount(transactions, budget.category) / budget.amount) * 100}
							color={getCategoryColor(budget.category)}
						></Progress>
						{getCategoryAmount(transactions, budget.category) > budget.amount && (
							<Text mt={"sm"} c="red" size="sm">
								{t("Overbudget")} ${getCategoryAmount(transactions, budget.category) - budget.amount}
							</Text>
						)}
					</Box>
				))}
			</Paper>
		</>
	);
}
