import { LABEL_COLORS } from "@/app/panel/components/coloredLabel/index.constants";

export const getLabelColor = (category: string) => {
	let hash = 0;

	for (const char of category) {
		hash = hash * 31 + char.charCodeAt(0);
	}

	return LABEL_COLORS[Math.abs(hash) % LABEL_COLORS.length] ?? "red";
};
