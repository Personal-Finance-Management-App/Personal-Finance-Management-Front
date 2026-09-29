import { BarChart } from "@mantine/charts";
import { Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import type { GroupedAccount } from "@/app/panel/accounts/components/accountsCard/index.types";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";

type Props = { groupedAccounts: GroupedAccount[] };
export default function AccountsIncome(props: Props) {
	const t = useTranslations();
	const BarChartIncomeByAccount = [...props.groupedAccounts]
		.sort((a, b) => b.income - a.income)
		.filter((account) => !!account.income)
		.map((account) => ({
			name: account.accountType,
			value: account.income,
			color: getLabelColor(account.accountType),
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
			<Text fz={"h4"} fw={"bold"} mb={"md"}>
				{t("IncomeByAccount")}
			</Text>
			{BarChartIncomeByAccount.length > 0 ? (
				<BarChart
					h={250}
					data={BarChartIncomeByAccount}
					dataKey="name"
					orientation="vertical"
					barProps={{ radius: 6 }}
					gridAxis="none"
					yAxisProps={{ width: 160 }}
					series={[{ name: "value", color: "gray.0" }]}
				/>
			) : (
				<Text c="dimmed" ta="center" py="xl">
					{t("NoDataAvailable")}
				</Text>
			)}

			<Stack mt="md">
				{[...props.groupedAccounts]
					.filter((account) => !!account.income)
					.sort((a, b) => b.income - a.income)
					.map((account) => (
						<Group key={account.accountType} justify="space-between">
							<ColoredLabel category={account.accountType} />
							<Text c={"gray.7"}>
								$
								<NumberFormatter thousandSeparator value={account.income} />
							</Text>
						</Group>
					))}
			</Stack>
		</Paper>
	);
}
