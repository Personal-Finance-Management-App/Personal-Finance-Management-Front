import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { EnvProvider } from "@/providers/EnvProvider";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import "@mantine/notifications/styles.css";
import { cookies } from "next/headers";
import { theme } from "@/theme/theme";

export const metadata: Metadata = {
	title: "FinFlow",
	description: "Personal Finance Management",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const locale = cookieStore.get("locale")?.value === "fa" ? "fa" : "en";
	const baseUrl = process.env["BASE_URL"];

	if (!baseUrl) {
		throw new Error("BASE_URL environment variable is not defined");
	}

	return (
		<html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>
					<Notifications position="top-right" />
					<EnvProvider envs={{ baseUrl }}>
						<QueryProvider>
							<NextIntlClientProvider>{children}</NextIntlClientProvider>
						</QueryProvider>
					</EnvProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
