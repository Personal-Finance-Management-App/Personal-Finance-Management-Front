import { Button, Flex } from "@mantine/core";
import type { Disclosure } from "@/types/GeneralService.types";

type Props = { modalHandler: Disclosure; title: string };

export default function AddingButton(props: Props) {
	return (
		<Flex justify={"center"} align={"center"}>
			<Button color={"layout"} variant="filled" onClick={props.modalHandler.open} mb={"xl"} mt={"xl"}>
				{props.title}
			</Button>
		</Flex>
	);
}
