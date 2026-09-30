import { Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

type Props = {
	onDelete: () => void;
	onEdit: () => void;
};
export default function ActionButtons(props: Props) {
	return (
		<Group justify="center" gap="xs" wrap="nowrap">
			{" "}
			<IconTrash
				style={{ cursor: "pointer" }}
				color="light-dark(var(--mantine-color-red-6), var(--mantine-color-red-5) )"
				onClick={props.onDelete}
				size={20}
			></IconTrash>
			<IconEdit
				style={{ cursor: "pointer" }}
				color="light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4) )"
				onClick={props.onEdit}
				size={20}
			></IconEdit>
		</Group>
	);
}
