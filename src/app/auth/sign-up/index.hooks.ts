import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { SignUpService } from "@/services/api/endpoints/auth/signUp.Service";

export const useSignUpQueryApi = () => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const getSignUpListAPiQueryData = useQuery({
		queryKey: ["get-signup-list"],
		queryFn: SignUpService.getSignUpListAPi,
		select: (response) => response.data,
	});

	const postSignUpAPiMutationData = useMutation({
		mutationKey: ["post-create-signup"],
		mutationFn: SignUpService.postSignUpAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-signup-list"],
			});
			notifications.show({
				title: t("Success"),
				message: t("UserCreated"),
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

	return {
		getSignUpListAPiQueryData,

		postSignUpAPiMutationData,
	};
};
