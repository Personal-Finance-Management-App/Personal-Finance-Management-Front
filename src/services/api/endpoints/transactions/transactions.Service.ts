import type {
	TransactionsByIdRes,
	TransactionsReq,
	TransactionsRes,
} from "@/services/api/models/transactions/transactions.types";
import { httpService } from "@/services/httpService";

const TRANSACTION_SERVICE_PATH = "/transactions";

export async function getTransactionsListAPi() {
	const response = await fetch("/api/transactions");

	return (await response.json()) as TransactionsRes;
}

export async function getTransactionsByIdAPi(id: string) {
	return await httpService.get<TransactionsByIdRes>(`${TRANSACTION_SERVICE_PATH}/${id}`);
}

export async function postCreateTransactionAPi(payload: TransactionsReq) {
	const response = await fetch("/api/transactions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Failed to create transaction");
	}

	return await response.json();
}

export async function updateTransactionAPi(id: string, payload: Partial<TransactionsReq>) {
	const response = await fetch(`/api/transactions/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Failed to update transaction");
	}

	return await response.json();
}

export async function deleteTransactionAPi(id: string) {
	const response = await fetch(`/api/transactions/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete transaction");
	}

	return await response.json();
}

export const TransactionService = {
	getTransactionsListAPi,
	getTransactionsByIdAPi,
	postCreateTransactionAPi,
	updateTransactionAPi,
	deleteTransactionAPi,
};
