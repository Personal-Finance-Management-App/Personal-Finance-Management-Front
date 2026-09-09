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
import { AppRoutes } from "@/constants/routes";

export default function Sidebar() {
	const t = useTranslations();
	const pathname = usePathname();
	const { overview, accounts, transactions, budgets, reports, profile } = AppRoutes;
	return (
		<Stack>
			<Text fw={700} ml={"md"} mt={"md"} size={"xl"}>
				Menu
			</Text>
			<Stack ml={"sm"}>
				<Group className={pathname === overview ? "active" : "inactive"}>
					<IconEye />
					<Link href={overview}>{t("Overview")}</Link>
				</Group>
				<Group className={pathname === accounts ? "active" : "inactive"}>
					<IconWallet />
					<Link href={accounts}>{t("Accounts")}</Link>
				</Group>
				<Group className={pathname === transactions ? "active" : "inactive"}>
					<IconArrowsDownUp />
					<Link href={transactions}>{t("Transactions")}</Link>
				</Group>
				<Group className={pathname === budgets ? "active" : "inactive"}>
					{" "}
					<IconPercentage30 />
					<Link href={budgets}>{t("Budgets")}</Link>
				</Group>
				<Group className={pathname === reports ? "active" : "inactive"}>
					{" "}
					<IconReportAnalytics />
					<Link href={reports}>{t("Reports")}</Link>
				</Group>
				<Group className={pathname === profile ? "active" : "inactive"} hiddenFrom={"sm"}>
					<IconUserFilled />
					<Link href={profile}>{t("Profile")}</Link>
				</Group>
			</Stack>
		</Stack>
	);
}
