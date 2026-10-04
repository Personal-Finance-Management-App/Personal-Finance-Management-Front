import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CurrentUserService } from "@/services/api/endpoints/auth/currentUser.Service";
import { signInApi } from "@/services/api/endpoints/auth/signIn.Service";

export function useSignInMutation() {
	const t = useTranslations();

	return useMutation({
		mutationFn: signInApi,

		onSuccess: () => {
			notifications.show({
				title: t("Success"),
				message: t("SignInSuccessfully"),
				color: "green",
			});
		},

		onError: (error) => {
			notifications.show({
				title: t("Failed"),
				message: error.message,
				color: "red",
			});
		},
	});
}

export function useCurrentUserQuery() {
	return useQuery({
		queryKey: ["current-user"],
		queryFn: CurrentUserService.getCurrentUserApi,
	});
}
