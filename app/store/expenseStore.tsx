import { create } from "zustand";

interface Expense {
  name: string;
  price: number;
  category: string;
}

interface ExpenseStore {
  expenses: Expense[];
  selectedCategories: string[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (index: number) => void;
  setSelectedCategories: (categories: string[]) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  selectedCategories: [],
}));
