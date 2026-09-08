import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

type SubmitButtonProps = {
	loading: boolean;
};
export default function SubmitButton({ loading }: SubmitButtonProps) {
	const t = useTranslations();
	return (
		<Button type={"submit"} color={"layout"} loading={loading}>
			{" "}
			{t("Submit")}
		</Button>
	);
}
