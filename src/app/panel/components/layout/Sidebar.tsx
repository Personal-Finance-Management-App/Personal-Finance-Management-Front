import { Stack } from "@mantine/core";

export default function Sidebar() {
	return (
		<Stack>
			<button type="button">Overview</button>
			<button type="button">Profile</button>
			<button type="button">Transactions</button>
			<button type="button">Budgets</button>
			<button type="button">Investments</button>
			<button type="button">Settings</button>
		</Stack>
	);
}
