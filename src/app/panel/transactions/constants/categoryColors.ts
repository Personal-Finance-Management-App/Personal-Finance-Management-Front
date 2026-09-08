export const categoryColors = ["red", "blue", "green", "orange", "violet", "cyan", "pink", "teal"];

export const getCategoryColor = (category: string) => {
	let hash = 0;

	for (const char of category) {
		hash = hash * 31 + char.charCodeAt(0);
	}

	return categoryColors[Math.abs(hash) % categoryColors.length] ?? "red";
};
