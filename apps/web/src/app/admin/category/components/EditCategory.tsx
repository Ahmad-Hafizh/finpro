/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";

interface EditCategoryFormProps {
  categoryData: {
    product_category_id: number;
    product_category_name: string;
  };
  setOpenDialog: (open: boolean) => void;
  token: string;
}

const EditCategory: React.FC<EditCategoryFormProps> = ({
  categoryData,
  setOpenDialog,
  token,
}) => {
  const { toast } = useToast();
  const [category, setCategory] = useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    setCategory({
      id: categoryData.product_category_id,
      name: categoryData.product_category_name,
    });
    form.reset({ category: categoryData.product_category_name });
  }, [categoryData]);

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
      id: category.id,
      name: values.category,
    };

    const submitApi = async (payload: any) => {
      try {
        const response = await callAPI.patch("/category", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.isSuccess) {
          toast({
            title: "Success",
            description: "Updating Category Success",
            className: "bg-gradient-to-r from-green-300 to-green-200",
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
        setOpenDialog(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong while updating category",
          variant: "destructive",
        });
        setOpenDialog(false);
      }
    };

    submitApi(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder={category.name || "Enter new category name"}
                  {...field}
                />
              </FormControl>
              <FormDescription>Edit category here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Category</Button>
      </form>
    </Form>
  );
};

export default EditCategory;
