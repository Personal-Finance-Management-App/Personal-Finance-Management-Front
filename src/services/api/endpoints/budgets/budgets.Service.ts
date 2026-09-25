import type { BudgetsByIdRes, BudgetsReq, BudgetsRes } from "@/services/api/models/budgets/budgets.types";
import { httpService } from "@/services/httpService";

const BUDGETS_SERVICE_PATH = "/budgets";

export async function getBudgetsListAPi() {
	return await httpService.get<BudgetsRes>(BUDGETS_SERVICE_PATH);
}

export async function getBudgetsByIdAPi(id: string) {
	return await httpService.get<BudgetsByIdRes>(`${BUDGETS_SERVICE_PATH}/${id}`);
}

export async function postBudgetsAPi(payload: BudgetsReq) {
	return await httpService.post(BUDGETS_SERVICE_PATH, payload);
}

export async function updateBudgetsAPi(id: string, payload: Partial<BudgetsReq>) {
	return await httpService.patch(`${BUDGETS_SERVICE_PATH}/${id}`, payload);
}

export async function deleteBudgetsAPi(id: string) {
	return await httpService.delete(`${BUDGETS_SERVICE_PATH}/${id}`);
}

export const BudgetsService = {
	getBudgetsListAPi,
	getBudgetsByIdAPi,
	postBudgetsAPi,
	updateBudgetsAPi,
	deleteBudgetsAPi,
};
