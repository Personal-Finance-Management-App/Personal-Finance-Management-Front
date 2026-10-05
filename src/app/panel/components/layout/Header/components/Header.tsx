"use client";

import {
	ActionIcon,
	Box,
	Burger,
	Drawer,
	Flex,
	Group,
	Stack,
	Text,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import LanguageSwitcher from "@/app/panel/components/layout/Header/components/languageSwitcher";
import Profile from "@/app/panel/components/layout/Header/components/profile/index.component";
import { useCurrentPage } from "@/app/panel/components/layout/Header/index.hooks";
import Sidebar from "@/app/panel/components/layout/Sidebar";

export default function Header() {
	const t = useTranslations();
	const [opened, { close, toggle }] = useDisclosure(false);
	const pathname = usePathname();
	const currentPage = useCurrentPage();

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const locale = useLocale();

	const dateLabel = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-persian" : "en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date());
	useEffect(() => {
		close();
	}, [pathname]);
	return (
		<Flex
			mx={{ sm: "lg" }}
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
					<Box bg="layout.5" w={36} h={36} className="flex shrink-0 items-center justify-center rounded-lg ">
						<Text fw={700} c="black" size={"xl"}>
							F
						</Text>
					</Box>

					<Text fw={700} size={"xl"} c="layout.5" className="hidden sm:block">
						{t("FinFlow")}
					</Text>
				</Group>

				<Stack ml={{ base: "xs", sm: "xl" }} gap={2} miw={0}>
					<Text className={"text-lg! sm:text-2xl! "} fw={700}>
						{t(currentPage.title)}
					</Text>

					<Text className={"text-sm! sm:text-lg! "} c="dimmed">
						{t(currentPage.description)}, {dateLabel}
					</Text>
				</Stack>
			</Flex>

			<Group gap="xs" wrap="nowrap">
				<Burger hiddenFrom="sm" opened={opened} onClick={toggle} size="sm" />
				<Drawer
					styles={{
						title: {
							color: "var(--mantine-color-layout-5)",
							fontSize: "24px",
							fontWeight: 700,
						},
					}}
					opened={opened}
					onClose={close}
					title={t("FinFlow")}
					hiddenFrom="sm"
					transitionProps={{
						duration: 600,
					}}
				>
					<Stack gap="md">
						<Sidebar />
					</Stack>
				</Drawer>
				<Profile />

				<Group visibleFrom={"sm"}>
					<ActionIcon onClick={toggleColorScheme} variant="filled" size="lg" color={"layout"}>
						{colorScheme === "dark" ? <IconSunFilled size={22} /> : <IconMoonFilled size={18} />}
					</ActionIcon>
					<LanguageSwitcher />
				</Group>
				<Stack hiddenFrom="sm">
					{" "}
					<ActionIcon onClick={toggleColorScheme} variant="filled" size="lg" color={"layout"}>
						{colorScheme === "dark" ? <IconSunFilled size={22} /> : <IconMoonFilled size={18} />}
					</ActionIcon>
					<LanguageSwitcher />
				</Stack>
			</Group>
		</Flex>
	);
}
