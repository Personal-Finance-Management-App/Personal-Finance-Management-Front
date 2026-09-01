"use client";

import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	NativeSelect,
	Stack,
	Text,
	useMantineColorScheme,
} from "@mantine/core";

import { IconMoonFilled } from "@tabler/icons-react";
import { useCurrentPage, useDataRange } from "@/app/panel/components/layout/Header/index.hooks";

export default function Header() {
	const currentPage = useCurrentPage();
	const { dateRange, setDateRange, dateLabel } = useDataRange();
	const { toggleColorScheme } = useMantineColorScheme();
	return (
		<Flex
			h="100%"
			align="center"
			justify="space-between"
			px={{
				base: "sm",
				sm: "md",
				lg: "lg",
			}}
		>
			{/* Left side */}
			<Flex
				align="center"
				gap={{
					base: "sm",
					sm: "md",
					lg: "lg",
				}}
				miw={0}
			>
				{/* Logo */}
				<Group gap="md" wrap="nowrap">
					<Box bg="layout.5" w={32} h={32} className="flex shrink-0 items-center justify-center rounded-lg ">
						<Text fw={700} c="black">
							F
						</Text>
					</Box>

					<Text fw={700} size="xl" c="layout.4" className="hidden sm:block">
						FinFlow
					</Text>
				</Group>

				{/* Page title */}
				<Stack gap={2} miw={0}>
					<Text size="xl" fw={700}>
						{currentPage.title}
					</Text>

					<Text size="sm" c="dimmed" truncate>
						{currentPage.description}, {dateLabel}
					</Text>
				</Stack>
			</Flex>

			{/* Right side */}
			<Group gap="xs" wrap="nowrap">
				<Button>Sign up</Button> <Button>Sign In</Button>
				<NativeSelect
					value={dateRange}
					onChange={(event) => setDateRange(event.currentTarget.value)}
					data={[
						{ value: "this-month", label: "This month" },
						{ value: "last-month", label: "Last month" },
						{ value: "this-year", label: "This year" },
						{ value: "last-year", label: "Last year" },
					]}
					w={{
						base: 110,
						sm: 140,
					}}
				/>
				<ActionIcon onClick={toggleColorScheme} variant="filled" size="lg">
					<IconMoonFilled size={18} />
				</ActionIcon>
			</Group>
		</Flex>
	);
}
