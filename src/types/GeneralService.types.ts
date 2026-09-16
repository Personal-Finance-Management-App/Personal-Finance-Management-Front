export type SessionEnvs = {
	baseUrl?: string;
};

export type Disclosure = {
	open: () => void;
	close: () => void;
	toggle: () => void;
};
