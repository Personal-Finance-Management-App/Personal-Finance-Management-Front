"use client";

import {
	ActionIcon,
	Badge,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Paper,
	RingProgress,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import {
	IconArrowRight,
	IconChartDonut,
	IconChartLine,
	IconLock,
	IconMoonFilled,
	IconSunFilled,
	IconWallet,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FeatureCard } from "@/app/panel/components/demoCard/FeatureCard";

export default function Page() {
	const t = useTranslations();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Box mih="100vh" bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
			<Container size="xl" py="lg">
				<Flex justify="space-between" align="center" gap="md">
					<ActionIcon onClick={toggleColorScheme} variant="filled" size="lg" color="layout">
						{colorScheme === "dark" ? <IconSunFilled size={22} /> : <IconMoonFilled size={18} />}
					</ActionIcon>

					<Link
						href="/"
						style={{
							textDecoration: "none",
							color: "inherit",
						}}
					>
						<Group gap="sm">
							<Box
								w={40}
								h={40}
								bg="layout.5"
								c="gray.9"
								style={{
									borderRadius: 12,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: 800,
									fontSize: 20,
								}}
							>
								F
							</Box>

							<Text
								fw={800}
								size="xl"
								c="light-dark(var(--mantine-color-dark-9), var(--mantine-color-gray-0))"
							>
								{t("FinFlow")}
							</Text>
						</Group>
					</Link>

					<Group gap="sm">
						<Button
							component={Link}
							href="/auth/sign-in"
							variant="subtle"
							c="light-dark(var(--mantine-color-dark-9), var(--mantine-color-gray-0))"
						>
							{t("SignIn")}
						</Button>

						<Button component={Link} href="/auth/sign-up" color="layout" radius="md">
							{t("GetStarted")}
						</Button>
					</Group>
				</Flex>
			</Container>

			<Container size="xl">
				<Grid align="center" py={{ base: 60, md: 100 }}>
					<Grid.Col span={{ base: 12, md: 6 }}>
						<Stack gap="xl">
							<Badge variant="light" color="layout" size="lg" radius="xl" w="fit-content">
								{t("PersonalFinanceSimplified")}
							</Badge>

							<Title order={1} fz={{ base: 42, sm: 52, md: 64 }} lh={1.05} fw={800}>
								{t("TakeControlOf")}{" "}
								<Text component="span" inherit c="layout.5">
									{t("YourFinances")}
								</Text>
							</Title>

							<Text size="lg" c="dimmed" maw={520} lh={1.7}>
								{t("TrackSpendingManageBudgets")}
							</Text>

							<Group gap="md" mt="sm">
								<Button
									component={Link}
									href="/auth/sign-up"
									color="layout"
									size="lg"
									radius="md"
									rightSection={<IconArrowRight size={18} />}
								>
									{t("CreateYourAccount")}
								</Button>

								<Button component={Link} href="/auth/sign-in" variant="default" size="lg" radius="md">
									{t("SignIn")}
								</Button>
							</Group>

							<Group gap="xl" mt="md">
								<Group gap="xs">
									<ThemeIcon size={30} radius="xl" variant="light" color="layout">
										<IconLock size={16} />
									</ThemeIcon>

									<Text size="sm" c="dimmed">
										{t("YourDataStaysPrivate")}
									</Text>
								</Group>
							</Group>
						</Stack>
					</Grid.Col>

					<Grid.Col span={{ base: 12, md: 6 }}>
						<Paper
							radius="xl"
							p={{ base: "md", sm: "xl" }}
							shadow="xl"
							withBorder
							bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))"
						>
							<Stack gap="lg">
								<Flex justify="space-between" align="center">
									<Box>
										<Text size="sm" c="dimmed">
											{t("TotalBalance")}
										</Text>

										<Text fw={800} fz={32}>
											$8,420.00
										</Text>
									</Box>

									<ThemeIcon size={46} radius="xl" color="layout" variant="light">
										<IconWallet size={24} />
									</ThemeIcon>
								</Flex>

								<SimpleGrid cols={2}>
									<Paper
										p="md"
										radius="md"
										bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
									>
										<Text size="xs" c="dimmed">
											{t("Income")}
										</Text>

										<Text fw={700} size="lg">
											$4,820
										</Text>
									</Paper>

									<Paper
										p="md"
										radius="md"
										bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
									>
										<Text size="xs" c="dimmed">
											{t("Expenses")}
										</Text>

										<Text fw={700} size="lg">
											$2,180
										</Text>
									</Paper>
								</SimpleGrid>

								<Divider />

								<Flex justify="space-between" align="center">
									<Box>
										<Text fw={700} size="md">
											{t("SpendingOverview")}
										</Text>
									</Box>

									<RingProgress
										size={100}
										thickness={10}
										roundCaps
										sections={[
											{
												value: 42,
												color: "layout.5",
											},
											{
												value: 28,
												color: "blue",
											},
											{
												value: 18,
												color: "orange",
											},
											{
												value: 12,
												color: "gray.4",
											},
										]}
										label={
											<Text ta="center" fw={700} size="sm">
												58%
											</Text>
										}
									/>
								</Flex>

								<Stack gap="sm">
									<Flex justify="space-between">
										<Text size="sm">{t("Food")}</Text>

										<Text size="sm" fw={600}>
											$420
										</Text>
									</Flex>

									<Flex justify="space-between">
										<Text size="sm">{t("Shopping")}</Text>

										<Text size="sm" fw={600}>
											$310
										</Text>
									</Flex>

									<Flex justify="space-between">
										<Text size="sm">{t("Transport")}</Text>

										<Text size="sm" fw={600}>
											$180
										</Text>
									</Flex>
								</Stack>
							</Stack>
						</Paper>
					</Grid.Col>
				</Grid>
			</Container>

			<Box bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))" py={{ base: 60, md: 80 }}>
				<Container size="xl">
					<Stack align="center" gap="sm" mb={50}>
						<Text c="layout.5" fw={700} size="sm">
							{t("EverythingInOnePlace")}
						</Text>

						<Title order={2} ta="center" fz={{ base: 28, md: 38 }}>
							{t("ClearerViewOfYourMoney")}
						</Title>

						<Text ta="center" c="dimmed" maw={600}>
							{t("FinFlowHelpsYouUnderstand")}
						</Text>
					</Stack>

					<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
						<FeatureCard
							icon={<IconChartLine size={22} />}
							title={t("TrackYourSpending")}
							description={t("KeepTransactionsOrganized")}
						/>

						<FeatureCard
							icon={<IconChartDonut size={22} />}
							title={t("ManageYourBudgets")}
							description={t("SetSpendingLimits")}
						/>

						<FeatureCard
							icon={<IconWallet size={22} />}
							title={t("UnderstandYourMoney")}
							description={t("TurnFinancialDataIntoInsights")}
						/>
					</SimpleGrid>
				</Container>
			</Box>

			<Container size="xl" py={{ base: 70, md: 100 }}>
				<Paper p={{ base: "xl", md: 50 }} radius="xl" bg="layout.6" c="white">
					<Flex
						direction={{ base: "column", md: "row" }}
						justify="space-between"
						align={{ base: "flex-start", md: "center" }}
						gap="xl"
					>
						<Stack gap="xs">
							<Title order={2} c="white">
								{t("ReadyToTakeControl")}
							</Title>

							<Text c="white" opacity={0.85}>
								{t("StartManagingYourFinancesWithFinFlow")}
							</Text>
						</Stack>

						<Button component={Link} href="/auth/sign-up" size="lg" radius="md" variant="white" c="layout.6">
							{t("GetStarted")}
						</Button>
					</Flex>
				</Paper>
			</Container>
		</Box>
	);
}
