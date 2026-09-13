export type Category = {
	id: string;
	name: string;
};

export type CategoriesRes = Category[];

export type CategoriesReq = Omit<Category, "id">;
