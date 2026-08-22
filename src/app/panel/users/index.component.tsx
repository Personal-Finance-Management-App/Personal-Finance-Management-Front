"use client";

import { Button, Center, Flex, Loader, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useUsersQueryApi } from "@/app/panel/users/hooks/index.hooks";

export default function UsersComponent() {
	const t = useTranslations();
	const { getUsersListQueryData, postCreateUserMutationData } = useUsersQueryApi();

	if (
		getUsersListQueryData.isPending ||
		getUsersListQueryData.isFetching ||
		getUsersListQueryData.isLoading
	) {
		return (
			<Center>
				<Loader />
			</Center>
		);
	}

	const createUsers = () => {
		postCreateUserMutationData
			.mutateAsync({
				userName: "test-1",
				name: "test",
				email: "test@gmail.com",
				phoneNumber: "123",
				age: 1,
			})
			.then(() => getUsersListQueryData.refetch());
	};

	return (
		<Center mt={"lg"}>
			{
				<Flex direction={"column"} rowGap={"20px"}>
					<Title>{t("usersList")}</Title>
					<Button onClick={createUsers} loading={postCreateUserMutationData.isPending}>
						Create User
					</Button>
					{getUsersListQueryData.data?.map((user) => (
						<Flex key={user.id} columnGap={"xl"}>
							<Flex gap={"xs"}>
								<Text fw={"bolder"}>Name:</Text>
								<Text>{user.name}</Text>
							</Flex>
							<Flex gap={"xs"}>
								<Text fw={"bolder"}>Email:</Text>
								<Text>{user.email}</Text>
							</Flex>
						</Flex>
					))}
				</Flex>
			}
		</Center>
	);
}
