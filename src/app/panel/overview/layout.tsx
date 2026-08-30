import "@mantine/core/styles.css";
import AppLayout from "@/app/components/layout/AppLayout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <AppLayout>{children}</AppLayout>;
}
