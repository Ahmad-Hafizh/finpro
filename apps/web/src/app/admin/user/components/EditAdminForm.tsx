"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(`Email must contain '@'`),
  store: z.string(),
});

interface EditAdminFormProps {
  storeData: any[];
}

const EditAdminForm = ({ storeData }: EditAdminFormProps) => {
  const dummyData = [
    {
      store_id: 1,
      store_name: "Good Store",
      store_address: "123 Main St",
    },
    {
      store_id: 2,
      store_name: "SuperMart",
      store_address: "456 Oak Ave",
    },
    {
      store_id: 3,
      store_name: "Budget Buy",
      store_address: "789 Pine Rd",
    },
    {
      store_id: 4,
      store_name: "Mega Store",
      store_address: "101 Elm St",
    },
    {
      store_id: 5,
      store_name: "Quick Stop",
      store_address: "202 Birch Blvd",
    },
    {
      store_id: 6,
      store_name: "Daily Needs",
      store_address: "303 Cedar Ln",
    },
    {
      store_id: 7,
      store_name: "Smart Mart",
      store_address: "404 Willow Way",
    },
    {
      store_id: 8,
      store_name: "Eco Store",
      store_address: "505 Maple Dr",
    },
    {
      store_id: 9,
      store_name: "Fresh Market",
      store_address: "606 Cherry Ct",
    },
    {
      store_id: 10,
      store_name: "Value Shop",
      store_address: "707 Spruce Ter",
    },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      store: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-0 my-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input name.." {...field} />
              </FormControl>
              <FormDescription>This is admin's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Input lastname.." {...field} />
              </FormControl>
              <FormDescription>This is admin's lastname.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input email.." {...field} />
              </FormControl>
              <FormDescription>This is admin's email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign a store to admin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dummyData.map((store) => {
                    return (
                      <SelectItem
                        key={store.store_id}
                        value={store.store_id.toString()}
                      >
                        {store.store_name}, {store.store_address}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                You can choose the store for an admin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditAdminForm;
