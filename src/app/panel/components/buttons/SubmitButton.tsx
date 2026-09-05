import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
	const t = useTranslations();
	return <Button color={"layout"}> {t("Submit")}</Button>;
}
