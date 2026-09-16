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
		description: HEADER_CONFIG_ENUM.MANAGE_YOUR_ACCOUNTS_AND_BALANCES,
	},
	"/panel/reports": {
		title: "Reports",
		description: HEADER_CONFIG_ENUM.ANALYZE_YOUR_FINANCIAL_ACTIVITIES,
	},

	"/panel/budgets": {
		title: "Budgets",
		description: HEADER_CONFIG_ENUM.PLAN_AND_MANAGE_YOUR_SPENDING,
	},

	"/panel/profile": {
		title: "Profile",
		description: HEADER_CONFIG_ENUM.MANAGE_YOUR_PERSONAL_INFORMATION,
	},
};
