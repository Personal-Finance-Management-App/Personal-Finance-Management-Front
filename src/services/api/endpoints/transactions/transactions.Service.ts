import type { TransactionsReq, TransactionsRes } from "@/services/api/models/transactions/index.types";
import { httpService } from "@/services/httpService";

const TRANSACTION_SERVICE_PATH = "/transactions";

export async function getTransactionsListAPi() {
	return await httpService.get<TransactionsRes>(TRANSACTION_SERVICE_PATH);
}

export async function postCreateTransactionAPi(payload: TransactionsReq) {
	return await httpService.post(TRANSACTION_SERVICE_PATH, payload);
}

export const TransactionService = {
	getTransactionsListAPi,
	postCreateTransactionAPi,
};
