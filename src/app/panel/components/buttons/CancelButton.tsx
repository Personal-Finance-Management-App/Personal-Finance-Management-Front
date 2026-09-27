import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

type Props = {
	handleCancel: () => void;
};
export default function CancelButton({ handleCancel }: Props) {
	const t = useTranslations();
	return (
		<Button bg={"layout"} onClick={handleCancel}>
			{t("Cancel")}
		</Button>
	);
}
