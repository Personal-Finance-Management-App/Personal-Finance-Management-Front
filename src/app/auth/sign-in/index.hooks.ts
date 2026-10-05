import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { signInApi } from "@/services/api/endpoints/auth/signIn.Service";

export function useSignInMutation() {
	const t = useTranslations();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signInApi,

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			notifications.show({
				title: t("Success"),
				message: t("SignInSuccessfully"),
				color: "green",
			});
		},

		onError: (error) => {
			notifications.show({
				title: t("Failed"),
				message: t(error.message),
				color: "red",
			});
		},
	});
}
