import { Box, Card, Divider, GridCol, Group, NumberFormatter, ScrollArea, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import type { AccountsCardProps } from "@/app/panel/accounts/components/accountsCard/index.types";

export default function AccountsCard({ accounts }: AccountsCardProps) {
	const t = useTranslations();

	return (
		<>
			{" "}
			<GridCol span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
				{accounts.length === 0 ? (
					<Card
						withBorder
						mb="md"
						padding="md"
						bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
					>
						<Text c="dimmed" ta="center" py="xl">
							{t("NoDataAvailable")}
						</Text>
					</Card>
				) : (
					<ScrollArea h={600} type="auto" offsetScrollbars>
						{[...accounts]
							.sort((a, b) => b.balance - a.balance)
							.map((account) => (
								<Card
									bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
									key={account.accountType}
									mb="md"
									padding="md"
									withBorder
								>
									<Group justify="space-between">
										<Text fw={600} fz="lg">
											{t(account.accountType)}
										</Text>

										<Text fw={600} c={account.balance < 0 ? "red.6" : "green.6"}>
											<NumberFormatter thousandSeparator prefix="$" value={account.balance} />
										</Text>
									</Group>

									<Group mt="md" grow>
										{account.income !== 0 && (
											<Box>
												<Text size="xs" c="gray.7">
													{t("Income")}
												</Text>
												<Text fw={500}>
													<NumberFormatter thousandSeparator prefix="$" value={account.income} />
												</Text>
											</Box>
										)}

										{account.expense !== 0 && (
											<Box>
												<Text size="xs" c="gray.7">
													{t("Expense")}
												</Text>
												<Text fw={500}>
													<NumberFormatter thousandSeparator prefix="$" value={account.expense} />
												</Text>
											</Box>
										)}
									</Group>

									<Divider my="md" />
									{account.accountType !== "Cash" && (
										<Text size="sm" fw={600} c="gray.7">
											{t("Accounts")}
										</Text>
									)}
									{account.accountType !== "Cash" &&
										account.groupedAccountsOptionGeneral.map((option) => (
											<Card
												bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
												key={option.accountOption}
												mt="sm"
												padding="sm"
												withBorder
											>
												<Group justify="space-between">
													<Text size="sm" fw={600}>
														{t(option.accountOption)}
													</Text>

													<Text size="sm" fw={600} c={option.balance < 0 ? "red.6" : "green.6"}>
														<NumberFormatter thousandSeparator prefix="$" value={option.balance} />
													</Text>
												</Group>

												<Group mt="xs">
													{!!option.income && (
														<Text size="xs" c="gray.7">
															{t("Income")}:{" "}
															<NumberFormatter thousandSeparator prefix="$" value={option.income} />
														</Text>
													)}

													{!!option.expense && (
														<Text size="xs" c="gray.7">
															{t("Expense")}:{" "}
															<NumberFormatter thousandSeparator prefix="$" value={option.expense} />
														</Text>
													)}
												</Group>
											</Card>
										))}
								</Card>
							))}
					</ScrollArea>
				)}
			</GridCol>
		</>
	);
}
