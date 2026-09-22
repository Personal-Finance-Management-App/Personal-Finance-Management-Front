import { Box, Group } from "@mantine/core";
import { getCategoryColor } from "@/app/panel/transactions/components/transactionCategory/index.helper";

type Props = {
	category: string;
};

export default function TransactionCategory(props: Props) {
	return (
		<Box
			w={140}
			px={"sm"}
			py={4}
			bg="light-dark(var(--mantine-color-gray-4), var(--mantine-color-gray-8))"
			style={{ borderRadius: "10px" }}
		>
			<Group gap={6} wrap="nowrap">
				<Box w={7} h={7} bg={getCategoryColor(props.category)} style={{ borderRadius: "50%" }} />
				{props.category}
			</Group>
		</Box>
	);
}
