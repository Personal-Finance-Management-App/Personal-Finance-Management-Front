import { Group, Stack, Text } from "@mantine/core";
import {
	IconArrowsDownUp,
	IconEye,
	IconPercentage30,
	IconReportAnalytics,
	IconUserFilled,
	IconWallet,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Sidebar() {
	const t = useTranslations();
	const pathname = usePathname();
	return (
		<Stack>
			<Text fw={700} ml={"md"} mt={"md"} size={"xl"}>
				Menu
			</Text>
			<Stack ml={"sm"}>
				<Group className={pathname === "/panel/overview" ? "active" : "inactive"}>
					<IconEye />
					<Link href="/panel/overview">{t("Overview")}</Link>
				</Group>
				<Group className={pathname === "/panel/accounts" ? "active" : "inactive"}>
					<IconWallet />
					<Link href={"/panel/accounts"}>{t("Accounts")}</Link>
				</Group>
				<Group className={pathname === "/panel/transactions" ? "active" : "inactive"}>
					<IconArrowsDownUp />
					<Link href={"/panel/transactions"}>{t("Transactions")}</Link>
				</Group>
				<Group className={pathname === "/panel/budgets" ? "active" : "inactive"}>
					{" "}
					<IconPercentage30 />
					<Link href={"/panel/budgets"}>{t("Budgets")}</Link>
				</Group>
				<Group className={pathname === "/panel/reports" ? "active" : "inactive"}>
					{" "}
					<IconReportAnalytics />
					<Link href={"/panel/reports"}>{t("Reports")}</Link>
				</Group>
				<Group className={pathname === "/panel/profile" ? "active" : "inactive"} hiddenFrom={"sm"}>
					<IconUserFilled />
					<Link href="/panel/profile">{t("Profile")}</Link>
				</Group>
			</Stack>
		</Stack>
	);
}
