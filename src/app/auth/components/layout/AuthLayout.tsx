"use client";

import { Box, Divider, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const t = useTranslations();
	return (
		<Box mih="100vh" px="md" pt={{ base: "xl", sm: 200 }} pb={{ base: "xl", sm: 60 }}>
			<Stack align="center" w="100%" maw={650} mx="auto" gap="xl">
				<Stack align="center" gap={4}>
					<Group gap="sm">
						<Box bg="layout.5" w={36} h={36} className="flex shrink-0 items-center justify-center rounded-lg">
							<Text fw={700} c="black" size="xl">
								F
							</Text>
						</Box>

						<Text size="28px" fw={800} c="layout">
							{t("FinFlow")}
						</Text>
					</Group>

					<Divider w={45} color="layout.5" size="sm" />

					<Text mt={4} size="xl" fw={700}>
						{t("welcomeToFinFlow")}
					</Text>

					<Text size="sm" c="gray.6" ta="center">
						{t(" ManageYourFinancesInOnePlace")}
					</Text>
				</Stack>

				{children}
			</Stack>
		</Box>
	);
}
