"use client";
import { Button, Center } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("Root");

	return (
		<Center>
			<Button size={"xl"} color={"green"}>
				{t("welcomeToFinance")}
			</Button>
		</Center>
	);
}
