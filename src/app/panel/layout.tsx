import "@mantine/core/styles.css";
import AppLayout from "@/app/panel/components/layout/AppLayout";

export default async function panelLayout({ children }: { children: React.ReactNode }) {
	return <AppLayout>{children}</AppLayout>;
}
