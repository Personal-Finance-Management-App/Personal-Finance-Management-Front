import type {
	Account,
	AccountsReq,
	AccountsRes,
} from "@/services/api/models/transactions/transactionAccounts/index.types";
import { httpService } from "@/services/httpService";

const TRANSACTION_ACCOUNT_SERVICE_PATH = "/transactionsAccounts";

export async function getTransactionsAccountListAPi() {
	return await httpService.get<AccountsRes>(TRANSACTION_ACCOUNT_SERVICE_PATH);
}

export async function postCreateTransactionAccountAPi(payload: AccountsReq) {
	return await httpService.post<Account>(TRANSACTION_ACCOUNT_SERVICE_PATH, payload);
}

export const AccountService = {
	getTransactionsAccountListAPi,
	postCreateTransactionAccountAPi,
};
