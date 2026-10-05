"use client";

import { ActionIcon } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();

	const handleLocaleChange = async () => {
		const nextLocale = locale === "en" ? "fa" : "en";

		const response = await fetch("/api/locale", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				locale: nextLocale,
			}),
		});

		if (!response.ok) {
			return;
		}

		router.refresh();
	};

	return (
		<ActionIcon onClick={handleLocaleChange} variant="filled" size="lg" color="layout">
			<IconLanguage size={20} />
		</ActionIcon>
	);
}
