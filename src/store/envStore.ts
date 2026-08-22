import { createStore } from "zustand";
import type { SessionEnvs } from "@/types/GeneralService.types";

export type PanelEnvStoreType = {
	envs: SessionEnvs;
	setEnvs(envs: SessionEnvs): void;
};

const envStore = createStore<PanelEnvStoreType>((set) => ({
	envs: { baseUrl: "" },
	setEnvs: (envs) => set({ envs }),
}));

export default envStore;
