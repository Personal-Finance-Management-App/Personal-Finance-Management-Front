"use client";
import { AppShell } from "@mantine/core";
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 240,
				breakpoint: "sm",
				collapsed: {
					mobile: true,
				},
			}}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar>
				<Sidebar />
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
