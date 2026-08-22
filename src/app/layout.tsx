import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from "@/providers/query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<QueryProvider>
					<MantineProvider>
						<NextIntlClientProvider>{children}</NextIntlClientProvider>
					</MantineProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
