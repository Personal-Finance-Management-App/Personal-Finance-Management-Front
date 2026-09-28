"use client";

import { usePathname } from "next/navigation";
import { headerConfig } from "@/app/panel/components/layout/Header/index.constants";

export function useCurrentPage() {
	const pathname = usePathname();
	const currentPath = Object.keys(headerConfig).find((path) => pathname.startsWith(path));
	return currentPath
		? headerConfig[currentPath as keyof typeof headerConfig]
		: headerConfig["/panel/overview"];
}
