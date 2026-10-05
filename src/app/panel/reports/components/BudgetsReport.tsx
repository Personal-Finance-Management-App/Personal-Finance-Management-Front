import { DonutChart } from "@mantine/charts";
import { Flex, Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";
import type { BudgetsRes } from "@/services/api/models/budgets/budgets.types";

type Props = {
	BudgetsList: BudgetsRes;
};
export default function BudgetsReport(props: Props) {
	const t = useTranslations();
	const DonutChartBudget = [...props.BudgetsList].map((budget) => ({
		name: budget.category,
		value: budget.amount,
		color: getLabelColor(budget.category),
	}));
	return (
		<Paper
			h={500}
			style={{ overflowY: "auto" }}
			mt={"md"}
			mx={{ base: "sm", sm: "lg" }}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			p="md"
			radius="lg"
		>
			<Text fz={"h4"} fw={"bold"}>
				{t("BudgetByCategory")}
			</Text>
			{DonutChartBudget.length > 0 ? (
				<DonutChart
					withTooltip={false}
					withLabelsLine
					labelsType="name"
					withLabels
					paddingAngle={14}
					h={300}
					data={DonutChartBudget}
				/>
			) : (
				<Flex h="85%" justify={"center"} align={"center"}>
					<Text c="dimmed">{t("NoDataAvailable")}</Text>
				</Flex>
			)}

			<Stack mt="md">
				{[...props.BudgetsList]
					.sort((a, b) => b.amount - a.amount)
					.map((budget) => (
						<Group key={budget.id} justify="space-between">
							<ColoredLabel category={budget.category} />
							<Text c={"gray.7"}>
								$<NumberFormatter thousandSeparator value={budget.amount} />
							</Text>
						</Group>
					))}
			</Stack>
		</Paper>
	);
}
