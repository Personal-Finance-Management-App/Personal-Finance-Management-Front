import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/services/api/endpoints/transactions/transactionsCategories/categories.Service";

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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-categories-list"] });
		},
	});

	return {
		getTransactionsCategoryListQueryData,
		postCreateCategoryMutationData,
	};
};
