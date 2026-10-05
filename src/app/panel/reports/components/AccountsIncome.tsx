import { BarChart } from "@mantine/charts";
import { Flex, Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
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
			h={500}
			style={{ overflowY: "auto" }}
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
				<Flex h="85%" justify={"center"} align={"center"}>
					<Text c="dimmed">{t("NoDataAvailable")}</Text>
				</Flex>
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
