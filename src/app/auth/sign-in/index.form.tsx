"use client";
import { Button, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSignInMutation } from "@/app/auth/sign-in/index.hooks";
import { AppRoutes } from "@/constants/routes";
import type { SignInFormValues } from "@/services/api/models/auth/signIn.types";

export default function SignInForm() {
	const t = useTranslations();
	const router = useRouter();
	const form = useForm<SignInFormValues>({ mode: "controlled", initialValues: { email: "", password: "" } });
	const signInMutation = useSignInMutation();
	const handleSubmit = (values: SignInFormValues) => {
		signInMutation.mutate(values, {
			onSuccess: () => {
				router.push(AppRoutes.overview);
			},
		});
	};
	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Paper
				w={{ base: 400, sm: 500, md: 600 }}
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
				p={{ base: "md", sm: "xl", md: "2xl" }}
				radius="lg"
			>
				<Stack>
					<Text ta="center" fw={700} size="xl">
						{t("SignIn")}
					</Text>
					<Text ta="center" size="sm" c="dimmed">
						{t("StartManagingYourFinancesWithEase")}
					</Text>
					<TextInput
						mt={"md"}
						type="email"
						leftSectionPointerEvents="none"
						leftSection={<IconAt size={16} />}
						label={t("YourEmail")}
						placeholder={t("YourEmail")}
						{...form.getInputProps("email")}
					/>

					<PasswordInput
						mt={"md"}
						label={t("Password")}
						placeholder={t("EnterYourPassword")}
						{...form.getInputProps("password")}
					/>
					<Button color={"layout"} mb={"sm"} mt={"md"} type="submit" fullWidth>
						{t("SignIn")}
					</Button>
					<Text ta="center" size="sm">
						{t("dontHaveAccount")} <Link href={"/auth/sign-up"}>{t("SignUp")}</Link>
					</Text>
				</Stack>
			</Paper>
		</form>
	);
}
