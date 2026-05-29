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
  // state
  expenses: [],
  selectedCategories: [],

  // actions
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),

  deleteExpense: (index) =>
    set((state) => ({
      expenses: state.expenses.filter((_, i) => i !== index)
    })),

  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
}))
