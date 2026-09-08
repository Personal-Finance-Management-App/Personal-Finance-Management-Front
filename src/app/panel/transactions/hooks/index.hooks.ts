import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionService } from "@/services/api/endpoints/transactions/transactions.Service";
import type { TransactionsReq } from "@/services/api/models/transactions/index.types";

export const useTransactionsQueryApi = () => {
	const queryClient = useQueryClient();
	const getTransactionsListQueryData = useQuery({
		queryKey: ["get-transactions-list"],
		queryFn: TransactionService.getTransactionsListAPi,
		select: (response) => response.data,
	});

	const postCreateTransactionMutationData = useMutation({
		mutationKey: ["post-create-transaction"],
		mutationFn: TransactionService.postCreateTransactionAPi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
		},
	});
	const patchUpdateTransactionData = useMutation({
		mutationKey: ["patch-update-transaction"],
		mutationFn: ({ id, payload }: { id: string; payload: Partial<TransactionsReq> }) =>
			TransactionService.updateTransactionAPi(id, payload),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
			});
		},
	});
	const deleteTransactionData = useMutation({
		mutationKey: ["delete-transaction"],
		mutationFn: TransactionService.deleteTransactionAPi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-transactions-list"],
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
