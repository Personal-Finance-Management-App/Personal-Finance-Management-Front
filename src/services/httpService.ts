// services/http.service.ts

import axios, { type AxiosInstance } from "axios";
import envStore from "@/store/envStore";

class HttpService {
	private readonly client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: envStore.getState().envs.baseUrl as string,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async get<T>(url: string, config = {}) {
		return await this.client.get<T>(url, config);
	}

	async post<T, D = unknown>(url: string, data?: D, config = {}) {
		return await this.client.post<T>(url, data, config);
	}

	async put<T, D = unknown>(url: string, data?: D, config = {}) {
		return await this.client.put<T>(url, data, config);
	}

	async patch<T, D = unknown>(url: string, data?: D, config = {}) {
		return await this.client.patch<T>(url, data, config);
	}

	async delete<T>(url: string, config = {}) {
		return await this.client.delete<T>(url, config);
	}
}

export const httpService = new HttpService();
