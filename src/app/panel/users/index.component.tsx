"use client";

import { Center, Flex, Loader, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useUsersQueryData } from "@/app/panel/users/hooks/index.hooks";

export default function UsersComponent() {
	const t = useTranslations("Users");
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
					<Title>{`${t("users")} ${t("list")}`}</Title>
					<Title>{t("usersList")}</Title>
					{usersData.data?.map((user) => (
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
