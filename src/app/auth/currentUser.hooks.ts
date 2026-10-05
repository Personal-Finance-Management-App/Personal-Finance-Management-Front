import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CurrentUserService } from "@/services/api/endpoints/auth/currentUser.Service";

export function useCurrentUserQuery() {
	return useQuery({
		queryKey: ["current-user"],
		queryFn: CurrentUserService.getCurrentUserApi,
	});
}

export function useUpdateCurrentUserMutation() {
	const t = useTranslations();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["patch-update-current-user"],
		mutationFn: CurrentUserService.updateCurrentUserApi,

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});

			notifications.show({
				title: t("Success"),
				message: t("UserUpdatedSuccessfully"),
				color: "green",
			});
		},

		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("FailedToUpdateUser"),
				color: "red",
			});
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["post-logout"],
		mutationFn: CurrentUserService.logoutApi,

		onSuccess: () => {
			queryClient.clear();
		},
	});
}
