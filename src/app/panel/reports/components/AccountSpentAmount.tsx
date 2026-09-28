import { PieChart } from "@mantine/charts";
import { Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import type { GroupedAccount } from "@/app/panel/accounts/components/accountsCard/index.types";
import ColoredLabel from "@/app/panel/components/coloredLabel";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";

type Props = { groupedAccounts: GroupedAccount[] };
export default function AccountSpentAmount(props: Props) {
	const t = useTranslations();
	const PieChartSpendingByAccount = [...props.groupedAccounts]
		.sort((a, b) => b.expense - a.expense)
		.filter((account) => !!account.expense)
		.map((account) => ({
			name: account.accountType,
			value: account.expense,
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
			<Text fz={"h4"} fw={"bold"}>
				{t("SpendingByAccount")}
			</Text>
			{PieChartSpendingByAccount.length > 0 ? (
				<PieChart
					withLabelsLine
					labelsPosition="outside"
					labelsType="percent"
					withLabels
					h={250}
					data={PieChartSpendingByAccount}
				/>
			) : (
				<Text c="dimmed" ta="center" py="xl">
					{t("NoDataAvailable")}
				</Text>
			)}

			<Stack mt="md">
				{[...props.groupedAccounts]
					.filter((account) => !!account.expense)
					.sort((a, b) => b.expense - a.expense)
					.map((account) => (
						<Group key={account.accountType} justify="space-between">
							<ColoredLabel category={account.accountType} />
							<Text c={"gray.7"}>
								$
								<NumberFormatter thousandSeparator value={account.expense} />
							</Text>
						</Group>
					))}
			</Stack>
		</Paper>
	);
}
