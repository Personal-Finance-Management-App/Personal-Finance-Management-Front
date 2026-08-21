import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/api/endpoints/users/users.Service";

export const useUsersQueryData = () =>
	useQuery({
		queryKey: ["users"],
		queryFn: UserService.getUsersListAPi,
		select: (response) => response.data,
	});
