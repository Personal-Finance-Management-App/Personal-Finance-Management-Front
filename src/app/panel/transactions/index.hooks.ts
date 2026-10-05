import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TransactionService } from "@/services/api/endpoints/transactions/transactions.Service";
import { AccountService } from "@/services/api/endpoints/transactionsAccounts/accounts.Service";
import { CategoryService } from "@/services/api/endpoints/transactionsCategories/categories.Service";
import type { TransactionsReq } from "@/services/api/models/transactions/transactions.types";

export const useTransactionsQueryApi = (id?: string) => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const getTransactionsListQueryData = useQuery({
		queryKey: ["get-transactions-list"],
		queryFn: TransactionService.getTransactionsListAPi,
	});

	const getTransactionsByIdQueryData = useQuery({
		queryKey: ["get-transactions-By-Id", id],
		queryFn: () => {
			if (!id) {
				throw new Error("ID Required");
			}

			return TransactionService.getTransactionsByIdAPi(id);
		},
		enabled: !!id,
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
				message: t("TransactionCreatedSuccessfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("FailedToCreateTransaction"),
				color: "red",
			});
		},
	});
	const patchUpdateTransactionData = useMutation({
		mutationKey: ["patch-update-transaction"],
		mutationFn: ({ id, payload }: { id: string; payload: Partial<TransactionsReq> }) =>
			TransactionService.updateTransactionAPi(id, payload),
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
			await queryClient.invalidateQueries({ queryKey: ["get-transactions-By-Id", variables.id] });
			notifications.show({
				title: t("Success"),
				message: t("TransactionUpdatedSuccessfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Failed"),
				message: t("FailedToUpdateTransaction"),
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
				message: t("TransactionDeletedSuccessfully"),
				color: "green",
			});
		},
		onError: () => {
			notifications.show({
				title: t("Error"),
				message: t("FailedToDeleteTransaction"),
				color: "red",
			});
		},
	});

	return {
		getTransactionsListQueryData,
		getTransactionsByIdQueryData,
		postCreateTransactionMutationData,
		patchUpdateTransactionData,
		deleteTransactionData,
	};
};

export const useTransactionsAccountQueryApi = () => {
	const queryClient = useQueryClient();
	const getTransactionsAccountListQueryData = useQuery({
		queryKey: ["get-accounts-list"],
		queryFn: AccountService.getTransactionsAccountListAPi,
		select: (response) => response.data,
	});

	const postCreateAccountMutationData = useMutation({
		mutationKey: ["post-create-account"],
		mutationFn: AccountService.postCreateTransactionAccountAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["get-accounts-list"] });
		},
	});

	return {
		getTransactionsAccountListQueryData,
		postCreateAccountMutationData,
	};
};

export const useTransactionsCategoryQueryApi = () => {
	const queryClient = useQueryClient();
	const getTransactionsCategoryListQueryData = useQuery({
		queryKey: ["get-categories-list"],
		queryFn: CategoryService.getTransactionsCategoryListAPi,
		select: (response) => response.data,
	});

	const postCreateCategoryMutationData = useMutation({
		mutationKey: ["post-create-category"],
		mutationFn: CategoryService.postCreateTransactionCategoryAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["get-categories-list"] });
		},
	});

	return {
		getTransactionsCategoryListQueryData,
		postCreateCategoryMutationData,
	};
};
