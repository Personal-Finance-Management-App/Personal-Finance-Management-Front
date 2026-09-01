import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function AuthButton() {
	const t = useTranslations("Layout");
	return (
		<>
			<Button color={"layout"}> {t("SignUp")}</Button> <Button color={"layout"}> {t("SignIn")}</Button>
		</>
	);
}
