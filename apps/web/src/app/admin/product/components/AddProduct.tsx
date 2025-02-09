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
import { useState, useEffect } from "react";

const AddProduct = () => {
  const category = [
    "Dry vegetable",
    "Fruit",
    "Wet vegetable",
    "Green vegetable",
    "Nut",
  ];
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Product name must atleasy 2 characters!",
    }),
    price: z.preprocess(
      (val) => Number(val),
      z
        .number()
        .min(1, {
          message: "Minimum price is 1! Price cannot be negative!",
        })
        .int("Must be whole number")
    ),
    category: z.string().nonempty({ message: "Category is required!" }),
    images: z
      .array(z.instanceof(File))
      .min(1, { message: "At least one image is required1" })
      .refine(
        (files) =>
          files.every((file) =>
            ["image/jpeg", "image/png", "image/gif"].includes(file.type)
          ),
        {
          message: "Only JPG, PNG, and GIF files are allowed1",
        }
      )
      .refine(
        (files) => files.every((file) => file.size <= 1024 * 1024), // 1MB max
        {
          message: "Each file must be under 1MB!",
        }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 1,
      category: "",
      images: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const updatedImages = [...(form.getValues("images") || []), ...fileArray];
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-0 my-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Input placeholder="Input product name.." {...field} />
              </FormControl>
              <FormDescription>
                Note: Product name cannot be the same.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input price.."
                  {...field}
                  type="number"
                  value={field.value}
                />
              </FormControl>
              <FormDescription>This is product price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {category.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>Assign category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={handleImageUpload}
                  name={field.name}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">LOLOLOL</Button>
      </form>
    </Form>
  );
};

export default AddProduct;
