import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { BudgetsService } from "@/services/api/endpoints/budgets/budgets.Service";
import type { BudgetsReq } from "@/services/api/models/budgets/budgets.types";

export const useBudgetsQueryApi = (budgetId?: string) => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const getBudgetsListAPiQueryData = useQuery({
		queryKey: ["get-budgets-list"],
		queryFn: BudgetsService.getBudgetsListAPi,
		select: (response) => response.data,
	});

	const getBudgetsByIdAPiQueryData = useQuery({
		queryKey: ["get-budgets-By-Id", budgetId],
		queryFn: () => {
			if (!budgetId) {
				throw new Error("Budget ID is required");
			}

			return BudgetsService.getBudgetsByIdAPi(budgetId);
		},
		enabled: !!budgetId,
	});

	const postBudgetsAPiMutationData = useMutation({
		mutationKey: ["post-create-budgets"],
		mutationFn: BudgetsService.postBudgetsAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-budgets-list"],
			});
			notifications.show({
				title: t("Success"),
				message: t("BudgetCreated"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("FailedToCreateBudget"),
				color: "red",
			});
		},
	});
	const updateBudgetsAPiData = useMutation({
		mutationKey: ["patch-update-budgets"],
		mutationFn: ({ id, payload }: { id: string; payload: Partial<BudgetsReq> }) =>
			BudgetsService.updateBudgetsAPi(id, payload),

		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["get-budgets-list"],
			});

			await queryClient.invalidateQueries({
				queryKey: ["get-budgets-By-Id", variables.id],
			});

			notifications.show({
				title: t("Success"),
				message: t("BudgetUpdatedSuccessfully"),
				color: "green",
			});
		},

		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("FailedToUpdateBudget"),
				color: "red",
			});
		},
	});
	const deleteBudgetsData = useMutation({
		mutationKey: ["delete-budgets"],
		mutationFn: BudgetsService.deleteBudgetsAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-budgets-list"],
			});
			notifications.show({
				title: t("Deleted"),
				message: t("BudgetDeletedSuccessfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Error"),
				message: t("FailedToDeleteBudget"),
				color: "red",
			});
		},
	});

	return {
		getBudgetsListAPiQueryData,
		getBudgetsByIdAPiQueryData,
		postBudgetsAPiMutationData,
		updateBudgetsAPiData,
		deleteBudgetsData,
	};
};
