import type {
	CategoriesReq,
	CategoriesRes,
	Category,
} from "@/services/api/models/transactions/transactionsCategory.types";
import { httpService } from "@/services/httpService";

const TRANSACTION_CATEGORY_SERVICE_PATH = "/transactionsCategories";

export async function getTransactionsCategoryListAPi() {
	return await httpService.get<CategoriesRes>(TRANSACTION_CATEGORY_SERVICE_PATH);
}

export async function postCreateTransactionCategoryAPi(payload: CategoriesReq) {
	return await httpService.post<Category>(TRANSACTION_CATEGORY_SERVICE_PATH, payload);
}

export const CategoryService = {
	getTransactionsCategoryListAPi,
	postCreateTransactionCategoryAPi,
};
