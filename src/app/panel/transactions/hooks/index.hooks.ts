import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionService } from "@/services/api/endpoints/transactions/transactions.Service";

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

	return {
		getTransactionsListQueryData,
		postCreateTransactionMutationData,
	};
};
