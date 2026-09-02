"use client";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations();

	return (
		<Center>
			<Link href="panel/overview" color={"green"}>
				{t("welcomeToFinance")}
			</Link>
		</Center>
	);
}
