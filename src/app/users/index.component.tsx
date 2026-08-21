"use client";

import { Badge, Center, Flex, Loader } from "@mantine/core";
import { useUsersQueryData } from "@/app/users/hooks/index.hooks";

export default function UsersComponent() {
	const usersData = useUsersQueryData();

	if (usersData.isPending || usersData.isFetching || usersData.isLoading) {
		return (
			<Center>
				<Loader />
			</Center>
		);
	}

	return (
		<Center mt={"lg"}>
			{
				<Flex direction={"column"} rowGap={"20px"}>
					{usersData.data?.map((user) => (
						<Flex key={user.id}>
							<Badge>{user.name}</Badge>
							<Badge>{user.email}</Badge>
						</Flex>
					))}
				</Flex>
			}
		</Center>
	);
}
