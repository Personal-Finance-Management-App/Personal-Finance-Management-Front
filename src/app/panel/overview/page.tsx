"use client";
import { Grid } from "@mantine/core";

export default function DashboardPage() {
	return (
		<Grid>
			<Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
				<div>main overview</div>
			</Grid.Col>
		</Grid>
	);
}
