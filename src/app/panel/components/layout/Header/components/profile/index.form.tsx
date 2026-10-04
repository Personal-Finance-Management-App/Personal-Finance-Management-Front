"use client";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLogoutMutation, useUpdateCurrentUserMutation } from "@/app/auth/currentUser.hooks";
import type { Disclosure } from "@/types/GeneralService.types";

type ProfileProps = {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
	modalHandler: Disclosure;
};
export default function ProfileForm({ user, modalHandler }: ProfileProps) {
	const t = useTranslations();
	const router = useRouter();
	const updateCurrentUserMutation = useUpdateCurrentUserMutation();
	const logOut = useLogoutMutation();
	const form = useForm({
		mode: "controlled",
		initialValues: {
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			email: user?.email ?? "",
			password: "",
			confirmPassword: "",
		},
		validate: {
			password: (value, values) => {
				if (value && value.length < 6) {
					return t("PasswordMinLength");
				}

				if (value !== values.confirmPassword) {
					return t("PasswordsDoNotMatch");
				}

				return null;
			},

			confirmPassword: (value, values) => {
				if (value !== values.password) {
					return t("PasswordsDoNotMatch");
				}

				return null;
			},
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		const payload = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			...(values.password && { password: values.password }),
		};
		await updateCurrentUserMutation.mutateAsync(payload);

		form.reset();
		modalHandler.close();
	};
	const handleLogout = async () => {
		await logOut.mutateAsync();
		modalHandler.close();
		router.push("/");
	};
	useEffect(() => {
		if (!user) return;

		form.setValues({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	}, [user]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput label={t("FirstName")} {...form.getInputProps("firstName")}></TextInput>
			<TextInput mt={"md"} label={t("LastName")} {...form.getInputProps("lastName")}></TextInput>
			<TextInput type={"email"} mt={"md"} label={t("Email")} {...form.getInputProps("email")}></TextInput>
			<PasswordInput mt="md" label={t("NewPassword")} {...form.getInputProps("password")} />

			<PasswordInput mt="md" label={t("ConfirmNewPassword")} {...form.getInputProps("confirmPassword")} />
			<Group mt={"md"} justify={"space-between"}>
				<Button loading={updateCurrentUserMutation.isPending} type="submit" color={"layout"}>
					{t("Edit")}
				</Button>
				<Button loading={logOut.isPending} onClick={handleLogout} color={"red.8"}>
					{t("LogOut")}
				</Button>
			</Group>
		</form>
	);
}
