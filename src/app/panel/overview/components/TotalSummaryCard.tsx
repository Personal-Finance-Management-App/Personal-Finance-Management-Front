import { Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";

type Props = {
	title: string;
	value: number;
	icon: React.ReactNode;
	status?: React.ReactNode;
	showPrefix?: boolean;
};

export default function TotalSummaryCard(props: Props) {
	return (
		<Paper
			h={150}
			mt={{ base: "md", sm: "xl" }}
			mx="sm"
			p="lg"
			radius="lg"
			bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-gray-9))"
		>
			<Stack align={"center"}>
				<Group gap="xs">
					{props.icon}

					<Text fz="h4" fw={600}>
						{props.title}
					</Text>
				</Group>

				<Group justify={"center"} mt={"md"}>
					<Text fz="xl" fw={700}>
						<NumberFormatter
							prefix={props.showPrefix ? (props.value >= 0 ? "+$" : "$") : "$"}
							thousandSeparator
							value={props.value}
						/>
					</Text>

					{props.status}
				</Group>
			</Stack>
		</Paper>
	);
}
