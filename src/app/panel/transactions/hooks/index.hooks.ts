import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TransactionService } from "@/services/api/endpoints/transactions/transactions.Service";
import type { TransactionsReq } from "@/services/api/models/transactions/transactions.types";

export const useTransactionsQueryApi = () => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const getTransactionsListQueryData = useQuery({
		queryKey: ["get-transactions-list"],
		queryFn: TransactionService.getTransactionsListAPi,
		select: (response) => response.data,
	});

	const postCreateTransactionMutationData = useMutation({
		mutationKey: ["post-create-transaction"],
		mutationFn: TransactionService.postCreateTransactionAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
			notifications.show({
				title: t("Success"),
				message: t("Transaction created successfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("Failed to create transaction"),
				color: "red",
			});
		},
	});
	const patchUpdateTransactionData = useMutation({
		mutationKey: ["patch-update-transaction"],
		mutationFn: ({ id, payload }: { id: string; payload: Partial<TransactionsReq> }) =>
			TransactionService.updateTransactionAPi(id, payload),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
			notifications.show({
				title: t("Success"),
				message: t("Transaction updated successfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("Failed to update transaction"),
				color: "red",
			});
		},
	});
	const deleteTransactionData = useMutation({
		mutationKey: ["delete-transaction"],
		mutationFn: TransactionService.deleteTransactionAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
			notifications.show({
				title: t("Deleted"),
				message: t("Transaction deleted successfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Error"),
				message: t("Failed to delete transaction"),
				color: "red",
			});
		},
	});

	return {
		getTransactionsListQueryData,
		postCreateTransactionMutationData,
		patchUpdateTransactionData,
		deleteTransactionData,
	};
};
