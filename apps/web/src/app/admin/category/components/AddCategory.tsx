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
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";

export type IAddCategory = {
  setOpenDialog: (open: boolean) => void;
};

const AddCategory = ({ setOpenDialog }: IAddCategory) => {
  const { toast } = useToast();
  const formSchema = z.object({
    category: z.string().nonempty({ message: "Category is required!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      name: values.category,
    };

    const submitApi = async (payload: any) => {
      try {
        const response = await callAPI.post("/category", payload);
        console.log("Ini response submit category: ", response);
        if (response.data.isSuccess) {
          toast({
            title: "Success",
            description: "Add category Success",
            className: "bg-gradient-to-r from-green-300 to-green-200",
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong while adding category",
          variant: "destructive",
        });
        console.log("Error submit category :", error);
        setOpenDialog(false);
      }
    };

    setOpenDialog(false);
    submitApi(payload);

    console.log("Value: ", payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex flex-col gap-0 space-y-8"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Add category.." {...field} />
              </FormControl>
              <FormDescription>Add category here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Category</Button>
      </form>
    </Form>
  );
};

export default AddCategory;
