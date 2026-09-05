"use client";
import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import dayjs from "dayjs";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import SubmitButton from "@/app/panel/components/buttons/SubmitButton";

export default function TransactionModal() {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Button variant="default" onClick={open}>
				Add a new transaction
			</Button>
			<Modal opened={opened} onClose={close} mt={"sm"}>
				{" "}
				<TextInput label="Title" placeholder="title" />{" "}
				<Select label="Type" placeholder="Pick a type" data={["Income", "Expense"]}></Select>{" "}
				<Select label="Category" placeholder="select your category" data={["+Add a new category"]}></Select>{" "}
				<TextInput label="Account" placeholder="account" />
				<DatePickerInput
					label="Select a Date"
					placeholder="Select date"
					presets={[
						{ value: dayjs().subtract(1, "day").format("YYYY-MM-DD"), label: "Yesterday" },
						{ value: dayjs().format("YYYY-MM-DD"), label: "Today" },
						{ value: dayjs().add(1, "day").format("YYYY-MM-DD"), label: "Tomorrow" },

						{ value: dayjs().subtract(1, "month").format("YYYY-MM-DD"), label: "Last month" },
						{ value: dayjs().subtract(1, "year").format("YYYY-MM-DD"), label: "Last year" },
					]}
				/>
				<TextInput mt={"sm"} label="Amount" placeholder="amount" />
				<Group justify={"flex-end"} mt={"sm"}>
					{" "}
					<SubmitButton />
				</Group>
			</Modal>
		</>
	);
}
