"use client";

import {
	ActionIcon,
	Box,
	Burger,
	Drawer,
	Flex,
	Group,
	Select,
	Stack,
	Text,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AuthButton from "@/app/panel/components/layout/Header/authButton";
import { useCurrentPage, useDataRange } from "@/app/panel/components/layout/Header/index.hooks";
import Sidebar from "@/app/panel/components/layout/Sidebar";

export default function Header() {
	const t = useTranslations("Layout");
	const [opened, setOpened] = useState(false);
	const currentPage = useCurrentPage();
	const { dateRange, setDateRange, dateLabel } = useDataRange();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Flex
			mx={{ sm: "xl" }}
			h="100%"
			align="center"
			justify="space-between"
			px={{
				base: "sm",
				sm: "md",
				lg: "lg",
			}}
		>
			<Flex
				align="center"
				gap={{
					base: "sm",
					sm: "md",
					lg: "lg",
				}}
				miw={0}
			>
				<Group gap="md" wrap="nowrap">
					<Box bg="layout.5" w={34} h={34} className="flex shrink-0 items-center justify-center rounded-lg ">
						<Text fw={700} c="black">
							F
						</Text>
					</Box>

					<Text fw={700} size="xl" c="layout.5" className="hidden sm:block">
						{t("FinFlow")}
					</Text>
				</Group>

				<Stack ml={{ base: "xs", sm: "sm" }} gap={2} miw={0}>
					<Text className={"text-lg! sm:text-2xl! "} fw={700}>
						{t(currentPage.title)}
					</Text>

					<Text className={"text-sm! sm:text-lg! "} c="dimmed">
						{t(currentPage.description)}, {dateLabel}
					</Text>
				</Stack>
			</Flex>

			<Group gap="xs" wrap="nowrap">
				<Burger hiddenFrom="sm" opened={opened} onClick={() => setOpened((value) => !value)} size="sm" />
				<Drawer
					styles={{
						title: {
							color: "var(--mantine-color-layout-5)",
							fontSize: "24px",
							fontWeight: 700,
						},
					}}
					opened={opened}
					onClose={() => setOpened(false)}
					title={t("FinFlow")}
					hiddenFrom="sm"
				>
					<Stack gap="md">
						<Sidebar />
						<Stack gap="xs">
							<AuthButton />
						</Stack>
					</Stack>
				</Drawer>
				<Group visibleFrom="sm" gap="xs" wrap="nowrap">
					<AuthButton />
				</Group>
				<Select
					w={{
						base: 80,
						sm: 140,
					}}
					value={dateRange}
					onChange={(value) => setDateRange(value ?? "this-month")}
					data={[
						{ value: "this-month", label: t("ThisMonth") },
						{ value: "last-month", label: t("LastMonth") },
						{ value: "this-year", label: t("ThisYear") },
						{ value: "last-year", label: t("LastYear") },
					]}
				/>
				<ActionIcon onClick={toggleColorScheme} variant="filled" size="lg" color={"layout"}>
					{colorScheme === "dark" ? <IconSunFilled size={22} /> : <IconMoonFilled size={18} />}
				</ActionIcon>
			</Group>
		</Flex>
	);
}
