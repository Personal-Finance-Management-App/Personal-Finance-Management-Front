"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { headerConfig } from "@/app/panel/config/headerConfig";

export function useCurrentPage() {
	const pathname = usePathname();
	const currentPath = Object.keys(headerConfig).find((path) => pathname.startsWith(path));
	return currentPath
		? headerConfig[currentPath as keyof typeof headerConfig]
		: headerConfig["/panel/overview"];
}

export function useDataRange() {
	const locale = useLocale();
	const [dateRange, setDateRange] = useState("this-month");
	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString(locale, { month: "long" });
	const currentYear = currentDate.getFullYear();
	const previousMonth = new Date(currentYear, currentDate.getMonth() - 1).toLocaleString(locale, {
		month: "long",
	});
	const previousYear = currentYear - 1;

	let dateLabel = "";
	switch (dateRange) {
		case "this-month":
			dateLabel = `${currentMonth} ${currentYear}`;
			break;

		case "last-month":
			dateLabel = `${previousMonth} ${currentYear}`;
			break;

		case "this-year":
			dateLabel = `${currentYear}`;
			break;

		case "last-year":
			dateLabel = `${previousYear}`;
			break;
	}

	return {
		dateRange,
		setDateRange,
		dateLabel,
	};
}
