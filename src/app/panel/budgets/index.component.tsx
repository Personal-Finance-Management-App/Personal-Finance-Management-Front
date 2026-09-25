"use client";
import { Box, Button, Flex, Group, Modal, Paper, Progress, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BudgetsForm from "@/app/panel/budgets/index.form";
import { getCategoryAmount } from "@/app/panel/budgets/index.helper";
import { useBudgetsQueryApi } from "@/app/panel/budgets/index.hooks";
import TransactionCategory from "@/app/panel/transactions/components/transactionCategory";
import { getCategoryColor } from "@/app/panel/transactions/components/transactionCategory/index.helper";
import { useTransactionsQueryApi } from "@/app/panel/transactions/index.hooks";

export default function BudgetsPage() {
	const [opened, modalHandler] = useDisclosure(false);
	const { getBudgetsListAPiQueryData } = useBudgetsQueryApi();
	const BudgetsList = getBudgetsListAPiQueryData.data ?? [];
	const { getTransactionsListQueryData } = useTransactionsQueryApi();
	const transactions = getTransactionsListQueryData.data ?? [];
	return (
		<>
			<Flex mt={"md"} justify={"center"} align={"center"}>
				<Button color={"layout"} variant="filled" onClick={modalHandler.open}>
					Add a new budget
				</Button>
			</Flex>
			<Modal withCloseButton={false} closeOnClickOutside={false} onClose={modalHandler.close} opened={opened}>
				<BudgetsForm modalHandler={modalHandler} />
			</Modal>
			<Paper
				mx={{ base: "sm", sm: "lg" }}
				radius={"lg"}
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			>
				<Text mt={"md"}>Category Budgets</Text>
				{BudgetsList.map((budget) => (
					<Box mt={"md"} key={budget.id}>
						<Group justify={"space-between"}>
							{" "}
							<TransactionCategory category={budget.category} />
							<Text>
								${getCategoryAmount(transactions, budget.category)} / ${budget.amount}
							</Text>
						</Group>
						<Progress
							mt={"sm"}
							mr={"lg"}
							ml={"sm"}
							value={(getCategoryAmount(transactions, budget.category) / budget.amount) * 100}
							color={getCategoryColor(budget.category)}
						></Progress>
						{getCategoryAmount(transactions, budget.category) > budget.amount && (
							<Text mt={"sm"} c="red" size="sm">
								Over budget by ${getCategoryAmount(transactions, budget.category) - budget.amount}
							</Text>
						)}
					</Box>
				))}
			</Paper>
		</>
	);
}
