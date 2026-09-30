import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
	href: string;
};

export default function ViewAllButton({ href }: Props) {
	const t = useTranslations();

	return (
		<Link href={href}>
			<Flex justify="center" align="center">
				<Button color="layout" variant="filled" mb="sm" mt="sm">
					{t("ViewAll")}
				</Button>
			</Flex>
		</Link>
	);
}
