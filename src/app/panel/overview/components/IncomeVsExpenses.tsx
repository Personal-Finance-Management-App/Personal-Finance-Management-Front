import { BarChart } from "@mantine/charts";
import { Group, NumberFormatter, Paper, Text } from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

type Props = {
	totalIncome: number;
	totalExpense: number;
};
export default function IncomeVsExpenses(props: Props) {
	const t = useTranslations();
	const incomeExpenseData = [
		{
			name: "Income",
			value: props.totalIncome,
		},
		{
			name: "Expenses",
			value: props.totalExpense,
		},
	];
	return (
		<Paper
			mt={"lg"}
			mb={"lg"}
			mx={{ base: "sm", sm: "lg" }}
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
			p="lg"
			radius="lg"
		>
			<Group mb={"xl"}>
				<IconChartBar size={25} />
				<Text fz={"h4"} fw={"bold"}>
					{t("IncomeVsExpenses")}
				</Text>
			</Group>
			{props.totalIncome > 0 || props.totalExpense > 0 ? (
				<>
					<BarChart
						mb={"lg"}
						h={300}
						barProps={{ barSize: 100, radius: 10 }}
						data={incomeExpenseData}
						dataKey="name"
						valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
						yAxisProps={{
							tickFormatter: (value) => `${value / 1000}k`,
						}}
						series={[
							{
								name: "value",
								color: "layout.6",
							},
						]}
					/>
					<Group justify="center" gap={"xl"} mt={"md"}>
						<Text c={"green"}>
							+$
							<NumberFormatter thousandSeparator value={props.totalIncome} />
						</Text>
						<Text c={"gray.7"}>|</Text>{" "}
						<Text c={"red.8"}>
							-$
							<NumberFormatter thousandSeparator value={props.totalExpense} />
						</Text>
					</Group>
				</>
			) : (
				<Text c="dimmed" ta="center" py="xl">
					{t("NoDataAvailable")}
				</Text>
			)}
		</Paper>
	);
}
