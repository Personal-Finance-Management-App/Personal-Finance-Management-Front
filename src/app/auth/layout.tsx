import "@mantine/core/styles.css";
import AuthLayout from "@/app/auth/components/layout/AuthLayout";

export default async function authLayout({ children }: { children: React.ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>;
}
