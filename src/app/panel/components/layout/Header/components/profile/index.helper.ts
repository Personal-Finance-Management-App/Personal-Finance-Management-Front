export const normalizeName = (value: string) => {
	return value
		.trim()
		.replace(/\s+/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());
};
