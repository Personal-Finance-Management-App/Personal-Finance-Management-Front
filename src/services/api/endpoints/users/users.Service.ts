import axios from "axios";
import type { UsersRs } from "@/services/api/models/users/index.types";

export async function getUsersListAPi() {
	return await axios.get<UsersRs>("https://jsonplaceholder.typicode.com/users");
}

export const UserService = {
	getUsersListAPi,
};
