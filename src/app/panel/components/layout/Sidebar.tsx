import { Box, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Sidebar() {
	const t = useTranslations("Layout");
	return (
		<Stack>
			<Text>Menu</Text>
			<Link href="/panel/overview">{t("Overview")}</Link>
			<Link href={"/panel/accounts"}>{t("Accounts")}</Link>
			<Link href={"/panel/transactions"}>{t("Transactions")}</Link>
			<Link href={"/panel/budgets"}>{t("Budgets")}</Link>
			<Link href={"/panel/reports"}>{t("Reports")}</Link>{" "}
			<Box hiddenFrom="sm">
				<Link href="/panel/profile">{t("Profile")}</Link>
			</Box>
		</Stack>
	);
}
