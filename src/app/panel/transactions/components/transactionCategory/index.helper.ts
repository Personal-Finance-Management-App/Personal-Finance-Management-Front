import { CATEGORY_COLORS } from "@/app/panel/transactions/components/transactionCategory/index.constants";

export const getCategoryColor = (category: string) => {
	let hash = 0;

	for (const char of category) {
		hash = hash * 31 + char.charCodeAt(0);
	}

	return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length] ?? "red";
};
