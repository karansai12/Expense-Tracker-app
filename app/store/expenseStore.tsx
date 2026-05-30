import { create } from "zustand";
import { persist } from "zustand/middleware" 

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


export const useExpenseStore = create<ExpenseStore>()(
  persist(                          
    (set) => ({
      expenses: [],
      selectedCategories: [],

      addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),

      deleteExpense: (index) =>
        set((state) => ({
          expenses: state.expenses.filter((_, i) => i !== index),
        })),

      setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),
    }),
    {
      name: "expense-storage",  // ← localStorage key name
    }
  )
)
