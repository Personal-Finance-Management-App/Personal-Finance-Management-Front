export type Budget = {
	id: string;
	amount: number;
	category: string;
};

export type BudgetsRes = Budget[];

export type BudgetsByIdRes = Budget;

export type BudgetsReq = Omit<Budget, "id">;
