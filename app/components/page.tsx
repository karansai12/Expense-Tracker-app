"use client";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ComboboxChips,
  ComboboxEmpty,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxInput,
} from "@/components/ui/combobox";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface Expense {
  name: string;
  price: number;
  category: string;
}

const categoriesList = ["food", "shopping", "travel", "bills"] as const;

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { register, handleSubmit, setValue } = useForm<Expense>({
    defaultValues: {
      name: "",
      price: 0,
      category: "",
    },
  });

  const handleOnAdd = (data: Expense) => {
    console.log({ data });
    if (!data.name || !data.price) return;
    setExpenses((prev) => [
      ...prev,
      { name: data.name, price: data.price, category: data.category },
    ]);
    setValue("name", "");
    setValue("price", 0);
  };
  console.log({ expenses });
  const handleOnDelete = (index: number) => {
    return setExpenses(expenses.filter((_, i) => i !== index));
  };
  const total = expenses.reduce((acc, item) => {
    if (categories.length === 0 || categories.includes(item.category)) {
      return acc + item.price;
    } else {
      return acc;
    }
  }, 0);

  const anchor = useComboboxAnchor();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl items-center flex justify-center">
          Expense Tracker 
        </h1>
        <div className="flex ">
          <form onSubmit={handleSubmit(handleOnAdd)}>
            <h2 className="text-2xl flex mb-4">
              Enter all your Expenses to track
            </h2>
            <div>
              <Field>
                <FieldLabel>Expense Name</FieldLabel>
                <Input
                  placeholder="e.g. Wifi bill"
                  className="mt-1"
                  {...register("name", { required: true })}
                />
                <FieldLabel>Enter Amount</FieldLabel>
                <Input
                  type="number"
                  placeholder="e.g. 100"
                  className="mt-1"
                  {...register("price", {
                    valueAsNumber: true,
                    required: true,
                  })}
                />
                <FieldLabel>Select Category</FieldLabel>

                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue="food"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="bills">Bills</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="flex justify-center items-center mt-2">
              <Button type="submit">Add Expense</Button>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl text-blue-400">Filter by Category</h2>
          <Combobox
            multiple
            autoHighlight
            items={categoriesList}
            defaultInputValue={[]}
            onValueChange={(value:string[])=>setCategories(value)}
          >
            <ComboboxChips ref={anchor} className="w-full">
              <ComboboxValue>
                {(values) => (
                  <>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxInput />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

        </div>
        <div>
          <h2 className="text-2xl text-red-300">Your total spending</h2>
          {expenses
            .filter((i) => {
              if (categories.length === 0 || categories.includes(i.category)) {
                return true;
              } else {
                return false;
              }
            })
            .map((i, index) => (
              
                <><div key={index}>
                        <li>
                            name: {i.name}, price: ${i.price},category:{i.category}
                        </li>
                </div><div>
                        <Button
                            onClick={() => {
                                handleOnDelete(index);
                            } }
                        >
                            Delete
                        </Button>
                    </div></>
              
            ))}
          <div>Total:{total}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
