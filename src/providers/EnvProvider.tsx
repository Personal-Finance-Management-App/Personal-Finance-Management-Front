"use client";

import { Flex, Loader } from "@mantine/core";
import { type PropsWithChildren, useEffect } from "react";
import { useStore } from "zustand/react";
import { useShallow } from "zustand/react/shallow";
import envStore from "@/store/envStore";
import type { SessionEnvs } from "@/types/GeneralService.types";

type Props = PropsWithChildren<{
	envs: SessionEnvs;
}>;

export function EnvProvider(props: Props) {
	const store = useStore(
		envStore,
		useShallow((state) => ({
			env: state.envs,
		})),
	);

	useEffect(() => {
		envStore.getState().setEnvs(props.envs);
	}, [props.envs]);

	if (!store.env.baseUrl) {
		return (
			<Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
				<Loader />
			</Flex>
		);
	}

	return <>{props.children}</>;
}
