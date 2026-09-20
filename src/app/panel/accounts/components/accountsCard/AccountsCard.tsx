import { Box, Card, Divider, GridCol, NumberFormatter, ScrollArea, Text } from "@mantine/core";
import type { AccountsCardProps } from "@/app/panel/accounts/components/accountsCard/index.types";

export default function AccountsCard({ accounts }: AccountsCardProps) {
	return (
		<>
			{" "}
			<GridCol span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
				<ScrollArea h={600} type="auto" offsetScrollbars>
					{accounts.map((account) => (
						<Card key={account.accountType} mb="md" padding="md" withBorder>
							<Card.Section inheritPadding p="md">
								<Text fz="xl">{account.accountType}</Text>

								<Box mt="xs">
									{account.income !== 0 && (
										<Text>
											Income: <NumberFormatter thousandSeparator prefix="$" value={account.income} />
										</Text>
									)}

									{account.expense !== 0 && (
										<Text>
											Expense: <NumberFormatter thousandSeparator prefix="$" value={account.expense} />
										</Text>
									)}

									<Text>
										Balance:{" "}
										<Text span c={account.balance < 0 ? "red.6" : "green.6"}>
											<NumberFormatter thousandSeparator prefix="$" value={account.balance} />
										</Text>
									</Text>
								</Box>

								<Divider my="md" />

								<Box mt="md">
									{account.groupedAccountsOptionGeneral.map((option) => (
										<Box key={option.accountOption} mt="sm">
											<Text fw={600}>{option.accountOption}</Text>

											{option.income !== 0 && (
												<Text>
													Income: <NumberFormatter thousandSeparator prefix="$" value={option.income} />
												</Text>
											)}

											{option.expense !== 0 && (
												<Text>
													Expense: <NumberFormatter thousandSeparator prefix="$" value={option.expense} />
												</Text>
											)}

											<Text>
												Balance:{" "}
												<Text span c={option.balance < 0 ? "red.6" : "green.6"}>
													<NumberFormatter thousandSeparator prefix="$" value={option.balance} />
												</Text>
											</Text>
										</Box>
									))}
								</Box>
							</Card.Section>
						</Card>
					))}
				</ScrollArea>
			</GridCol>
		</>
	);
}
