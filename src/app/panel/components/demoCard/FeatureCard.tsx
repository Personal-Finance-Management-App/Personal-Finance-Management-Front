import { Paper, Stack, Text, ThemeIcon } from "@mantine/core";

type FeatureCardProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<Paper p="xl" radius="lg" withBorder h="100%">
			<Stack gap="md">
				<ThemeIcon size={46} radius="md" color="layout" variant="light">
					{icon}
				</ThemeIcon>

				<Text fw={700} size="lg">
					{title}
				</Text>

				<Text size="sm" c="dimmed" lh={1.7}>
					{description}
				</Text>
			</Stack>
		</Paper>
	);
}
