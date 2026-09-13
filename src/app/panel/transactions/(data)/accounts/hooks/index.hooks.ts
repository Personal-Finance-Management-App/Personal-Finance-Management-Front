import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountService } from "@/services/api/endpoints/transactionsAccounts/accounts.Service";

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
