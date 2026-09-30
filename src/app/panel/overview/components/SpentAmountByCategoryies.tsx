import { DonutChart } from "@mantine/charts";
import { Grid, Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { IconReportMoney } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import ViewAllButton from "@/app/panel/components/buttons/ViewAll";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";
import { getGroupedCategories } from "@/app/panel/reports/index.helper";
import type { TransactionsRes } from "@/services/api/models/transactions/transactions.types";

type Props = {
	transactions: TransactionsRes;
};
export default function SpentAmountByCategories(props: Props) {
	const t = useTranslations();
	const groupedCategories = getGroupedCategories(props.transactions);

	const DonutChartSpending = [...groupedCategories]
		.filter((category) => category.expense > 0)

		.sort((a, b) => b.expense - a.expense)
		.slice(0, 5)
		.map((category) => ({
			name: category.category,
			value: category.expense,
			color: getLabelColor(category.category),
		}));
	return (
		<Paper
			mt={"lg"}
			mb={"lg"}
			mx={{ base: "sm", sm: "lg" }}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			p="lg"
			radius="lg"
		>
			<Group mb={"lg"}>
				<IconReportMoney size={25} />
				<Text fz={"h4"} fw={"bold"}>
					{t("SpendingOverview")}
				</Text>
			</Group>

			<Grid align="center">
				<Grid.Col span={{ base: 12, sm: 6 }}>
					{DonutChartSpending.length > 0 ? (
						<DonutChart
							withTooltip={false}
							withLabelsLine
							labelsType="percent"
							withLabels
							paddingAngle={14}
							h={300}
							data={DonutChartSpending}
						/>
					) : (
						<Text c="dimmed" ta="center" py="xl">
							{t("NoDataAvailable")}
						</Text>
					)}
				</Grid.Col>

				<Grid.Col span={{ base: 12, sm: 6 }}>
					<Stack>
						{groupedCategories
							.filter((category) => category.expense > 0)
							.sort((a, b) => b.expense - a.expense)
							.slice(0, 5)
							.map((category) => (
								<Group key={category.category} justify="space-between">
									<ColoredLabel category={category.category} />
									<Text c="gray.7">
										$
										<NumberFormatter thousandSeparator value={category.expense} />
									</Text>
								</Group>
							))}
					</Stack>
				</Grid.Col>
			</Grid>
			<ViewAllButton href="/panel/reports" />
		</Paper>
	);
}
