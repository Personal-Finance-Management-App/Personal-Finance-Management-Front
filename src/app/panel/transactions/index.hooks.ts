import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionService } from "@/services/api/endpoints/transactions/transactions.Service";
import { AccountService } from "@/services/api/endpoints/transactions/transactionsAccounts/accounts.Service";
import { CategoryService } from "@/services/api/endpoints/transactions/transactionsCategories/categories.Service";
import type { TransactionsReq } from "@/services/api/models/transactions/index.types";

export const useTransactionsQueryApi = () => {
	const queryClient = useQueryClient();
	const getTransactionsListQueryData = useQuery({
		queryKey: ["get-transactions-list"],
		queryFn: TransactionService.getTransactionsListAPi,
		select: (response) => response.data,
	});

	const getTransactionsByIdQueryData = useMutation({
		mutationKey: ["get-transactions-By-Id"],
		mutationFn: TransactionService.getTransactionsByIdAPi,
	});

	const postCreateTransactionMutationData = useMutation({
		mutationKey: ["post-create-transaction"],
		mutationFn: TransactionService.postCreateTransactionAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
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
		},
	});
	const deleteTransactionData = useMutation({
		mutationKey: ["delete-transaction"],
		mutationFn: TransactionService.deleteTransactionAPi,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
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
