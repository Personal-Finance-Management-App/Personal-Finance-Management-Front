"use client";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	Group,
	Paper,
	PasswordInput,
	Progress,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSignUpQueryApi } from "@/app/auth/sign-up/index.hooks";
import type { SignUpFormValues, SignUpReq } from "@/services/api/models/auth/signUp.types";

export default function SignUpForm() {
	const router = useRouter();
	const { postSignUpAPiMutationData } = useSignUpQueryApi();
	const t = useTranslations();
	const form = useForm<SignUpFormValues>({
		mode: "controlled",
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
		validate: {
			firstName: (value) => (value.trim() ? null : t("firstNameRequired")),
			lastName: (value) => (value.trim() ? null : t("LastNameRequired")),
			email: (value) => (value.trim() ? null : t("EmailRequired")),
			password: (value) => {
				if (!value) return t("PasswordRequired");
				if (value.length < 6) return t("PasswordMinLength");

				return null;
			},
			confirmPassword: (value) => {
				if (!value) return t("ConfirmPasswordRequired");

				if (value !== form.values.password) {
					return t("PasswordsDoNotMatch");
				}

				return null;
			},
			terms: (value) => (value ? null : t("TermsRequired")),
		},
	});
	const password = form.values.password;

	const passwordStrength = [
		password.length >= 8,
		/[A-Z]/.test(password),
		/[a-z]/.test(password),
		/\d/.test(password),
	].filter(Boolean).length;

	const passwordStrengthValue = passwordStrength * 25;
	const handleSubmit = async (values: SignUpFormValues) => {
		const payload: SignUpReq = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
		};

		postSignUpAPiMutationData.mutate(payload, {
			onSuccess: (data) => {
				console.log(data);
				router.push("/panel/overview");
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
						{t("CreateYourAccount")}
					</Text>
					<Text ta="center" size="sm" c="dimmed">
						{t("StartManagingYourFinancesWithEase")}
					</Text>
					<Group grow>
						<TextInput
							label={t("FirstName")}
							placeholder={t("FirstName")}
							{...form.getInputProps("firstName")}
						/>

						<TextInput
							label={t("LastName")}
							placeholder={t("LastName")}
							{...form.getInputProps("lastName")}
						/>
					</Group>
					<TextInput
						type="email"
						mt={"md"}
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
					{password && (
						<Box mt={"md"} mb={"md"}>
							<Text size="xs" c="dimmed" mb={5}>
								{t("PasswordStrength")}
							</Text>

							<Progress color={"layout"} value={passwordStrengthValue} size="sm" />
						</Box>
					)}

					<PasswordInput
						mt={"md"}
						label={t("ConfirmPassword")}
						placeholder={t("ConfirmPassword")}
						{...form.getInputProps("confirmPassword")}
					/>
					<Button color={"layout"} mb={"sm"} mt={"md"} type="submit" fullWidth>
						{t("CreateYourAccount")}
					</Button>
					<Checkbox label={t("IAgreeTerms")} {...form.getInputProps("terms", { type: "checkbox" })} />
					<Divider label="or" labelPosition="center" />
					<Text ta="center" size="sm">
						{t("AlreadyHaveAccount?")} <Link href="/auth/sign-in">{t("SignIn")}</Link>
					</Text>
				</Stack>
			</Paper>
		</form>
	);
}
