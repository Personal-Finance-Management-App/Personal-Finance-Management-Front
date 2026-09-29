import { Box, Group } from "@mantine/core";
import { useTranslations } from "next-intl";
import { getLabelColor } from "@/app/panel/components/coloredLabel/index.helper";

type Props = {
	category: string;
};

export default function ColoredLabel(props: Props) {
	const t = useTranslations();
	return (
		<Box
			w={140}
			px={"sm"}
			py={4}
			bg="light-dark(var(--mantine-color-gray-4), var(--mantine-color-gray-8))"
			style={{ borderRadius: "10px" }}
		>
			<Group gap={6} wrap="nowrap">
				<Box w={7} h={7} bg={getLabelColor(props.category)} style={{ borderRadius: "40%" }} />
				{t(props.category)}
			</Group>
		</Box>
	);
}
