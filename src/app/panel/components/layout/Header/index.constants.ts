import { HEADER_CONFIG_ENUM } from "@/app/panel/components/layout/Header/index.enum";

export const headerConfig = {
	"/panel/overview": {
		title: "Overview",
		description: HEADER_CONFIG_ENUM.YOUR_COMPLETE_FINANCIAL_PICTURE,
	},

	"/panel/transactions": {
		title: "Transactions",
		description: HEADER_CONFIG_ENUM.TRACK_AND_MANAGE_ALL_YOUR_TRANSACTIONS,
	},
	"/panel/accounts": {
		title: "Accounts",
		description: "Manage your accounts and balances",
	},
	"/panel/reports": {
		title: "Reports",
		description: "Analyze your financial activities",
	},

	"/panel/budgets": {
		title: "Budgets",
		description: "Plan and manage your spending",
	},

	"/panel/profile": {
		title: "Profile",
		description: "Manage your personal information",
	},
};
