import type { BudgetsByIdRes, BudgetsReq, BudgetsRes } from "@/services/api/models/budgets/budgets.types";
import { httpService } from "@/services/httpService";

const BUDGETS_SERVICE_PATH = "/budgets";

export async function getBudgetsListAPi() {
	const response = await fetch("/api/budgets");

	return (await response.json()) as BudgetsRes;
}

export async function getBudgetsByIdAPi(id: string) {
	return await httpService.get<BudgetsByIdRes>(`${BUDGETS_SERVICE_PATH}/${id}`);
}

export async function postBudgetsAPi(payload: BudgetsReq) {
	const response = await fetch("/api/budgets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Failed to create budget");
	}

	return await response.json();
}

export async function updateBudgetsAPi(id: string, payload: Partial<BudgetsReq>) {
	const response = await fetch(`/api/budgets/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Failed to update budget");
	}

	return await response.json();
}

export async function deleteBudgetsAPi(id: string) {
	const response = await fetch(`/api/budgets/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete budget");
	}

	return await response.json();
}

export const BudgetsService = {
	getBudgetsListAPi,
	getBudgetsByIdAPi,
	postBudgetsAPi,
	updateBudgetsAPi,
	deleteBudgetsAPi,
};
