import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/api/endpoints/users/users.Service";

export const useUsersQueryApi = () => {
	const getUsersListQueryData = useQuery({
		queryKey: ["get-users-list"],
		queryFn: UserService.getUsersListAPi,
		select: (response) => response.data,
	});

	const postCreateUserMutationData = useMutation({
		mutationKey: ["post-create-user"],
		mutationFn: UserService.postCreateUserAPi,
	});

	return {
		getUsersListQueryData,
		postCreateUserMutationData,
	};
};
