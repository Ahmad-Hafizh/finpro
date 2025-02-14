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
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface EditCategoryFormProps {
  categoryData:{
    id:number,
    name:string;
  }
}

const EditCategory = (categoryData : EditCategoryFormProps) => {
    const [category, setCategory] = useState<any>({
        id:0,
        name:""
    })

    useEffect(()=>{
        setCategory(categoryData);
        form.reset({ category: categoryData.categoryData.name });
    }, [categoryData])

  const formSchema = z.object({
    category: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
    id: categoryData.categoryData.id,
      name: values.category
    }
    console.log("Value: ", payload)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-0 my-5"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder={category?.name ? category?.name : "Category cannot be the same"} {...field} />
              </FormControl>
              <FormDescription>Edit category here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">LOLOLOL</Button>
      </form>
    </Form>
  );
};

export default EditCategory;
