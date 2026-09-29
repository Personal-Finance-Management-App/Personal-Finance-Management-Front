import { BarChart } from "@mantine/charts";
import { Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";
import { getGroupedCategories } from "@/app/panel/reports/index.helper";
import type { TransactionsRes } from "@/services/api/models/transactions/transactions.types";

type Props = {
	transactions: TransactionsRes;
};
export default function CategorySpentAmount(props: Props) {
	const t = useTranslations();
	const groupedCategories = getGroupedCategories(props.transactions);

	const BarChartSpendingByCategory = [...groupedCategories]
		.filter((category) => category.expense > 0)
		.sort((a, b) => b.expense - a.expense)
		.map((category) => ({
			name: category.category,
			value: category.expense,
			color: getLabelColor(category.category),
		}));
	return (
		<Paper
			mt={"md"}
			mb={"md"}
			mx={{ base: "sm", sm: "lg" }}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			p="md"
			radius="lg"
		>
			<Text fz={"h4"} fw={"bold"} mb={"lg"}>
				{t("SpendingByCategory")}
			</Text>

			{BarChartSpendingByCategory.length > 0 ? (
				<BarChart
					barProps={{ barSize: 100 }}
					h={200}
					data={BarChartSpendingByCategory}
					dataKey="name"
					series={[
						{
							name: "value",
							color: "layout",
						},
					]}
					orientation="horizontal"
					valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
				/>
			) : (
				<Text c="dimmed" ta="center" py="xl">
					{t("NoDataAvailable")}
				</Text>
			)}

			<Stack mt="md">
				{groupedCategories
					.filter((category) => category.expense > 0)
					.sort((a, b) => b.expense - a.expense)
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
		</Paper>
	);
}
