import type { UsersRq, UsersRs } from "@/services/api/models/users/index.types";
import { httpService } from "@/services/httpService";

const USER_SERVICE_PATH = "/users";

export async function getUsersListAPi() {
	return await httpService.get<UsersRs>(USER_SERVICE_PATH);
}

export async function postCreateUserAPi(payload: UsersRq) {
	return await httpService.post(USER_SERVICE_PATH, payload);
}

export const UserService = {
	getUsersListAPi,
	postCreateUserAPi,
};
