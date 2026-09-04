"use client";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AppRoutes } from "@/constants/routes";

export default function Page() {
	const t = useTranslations();
	const { overview } = AppRoutes;

	return (
		<Center>
			<Link href={overview} color={"green"}>
				{t("welcomeToFinance")}
			</Link>
		</Center>
	);
}
