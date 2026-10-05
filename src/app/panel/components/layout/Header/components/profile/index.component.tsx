import { ActionIcon, Avatar, Group, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useCurrentUserQuery } from "@/app/auth/currentUser.hooks";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";
import ProfileForm from "@/app/panel/components/layout/Header/components/profile/index.form";

export default function Profile() {
	const { data } = useCurrentUserQuery();
	const t = useTranslations();
	const user = data?.user ?? null;
	const [opened, modalHandler] = useDisclosure(false);
	return (
		<>
			<Paper
				radius="xl"
				p={"sm"}
				pr="sm"
				bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
				style={{
					cursor: "pointer",
					transition: "0.2s",
				}}
			>
				<Group justify={"center"} gap="sm">
					<Avatar color={getLabelColor(user?.email ?? "")} size={"md"} radius="xl">
						{user?.firstName?.[0]?.toUpperCase()}
						{user?.lastName?.[0]?.toUpperCase()}
					</Avatar>

					<Stack gap={0} visibleFrom="sm">
						<Text fw={600} size="sm">
							{user?.firstName} {user?.lastName}
						</Text>

						<Text c="dimmed" size="xs">
							{user?.email}
						</Text>
					</Stack>

					<ActionIcon onClick={modalHandler.open} variant="subtle" size="sm">
						<IconChevronDown size={16} />
					</ActionIcon>
				</Group>
			</Paper>
			<Modal title={t("UserInformation")} onClose={modalHandler.close} opened={opened}>
				<ProfileForm user={user} modalHandler={modalHandler} />
			</Modal>
		</>
	);
}
