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
import { Textarea } from "@/components/ui/textarea";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_category_id: number;
  product_description: string | null;
  deletedAt: string | null;
  stock: Stock;
  product_img: any[];
  product_category: ProductCategory;
  voucher: any[];
};

export type Stock = {
  stock_id: number;
  store_id: number;
  product_id: number;
  quantity: number;
};

export type ProductCategory = {
  product_category_id: number;
  product_category_name: string;
  deletedAt: string | null;
};

export type IEditStock = {
  products: Product;
  store_id?: number;
  token?: any;
  setOpenDialog: (open: boolean) => void;
};

const EditStock = ({
  products,
  store_id,
  token,
  setOpenDialog,
}: IEditStock) => {
  console.log("INI PRODUCT DARI EDIT STOCK: ", products);
  // console.log(
  //   "INI PRODUCT DARI EDIT STOCKKKKKKK: ",
  //   Array.isArray(products.stock),
  // );
  const { toast } = useToast();

  const formSchema = z.object({
    product_id: z.any(),
    amount: z.number().min(1, { message: "Cannot zero or negative number!" }),
  });

  const stockArray = Array.isArray(products?.stock) ? products.stock : [];
  const newStockArray = stockArray.filter(
    (stock: any) => stock.store_id === store_id,
  );

  console.log("INI NEW STOCK ARRAY : ", newStockArray);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_id: products.product_id,
      amount: products.stock.quantity,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("THIS IS PRODUCTS : lll :  ", products);

    const payload = {
      product_id: products.product_id,
      store_id: store_id,
      quantity: values.amount,
    };
    console.log("THIS IS PAYLOAD : ", payload);

    const response = await callAPI.patch("/stock", payload, {
      headers: { Authorization: `bearer ${token}` },
    });

    if (response.status === 200) {
      toast({
        title: "Success",
        description: "Editing Stock Success",
        className: "bg-gradient-to-r from-green-300 to-green-200",
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong while editing stock",
        variant: "destructive",
      });
    }

    setOpenDialog(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex flex-col gap-0 space-y-8"
      >
        <FormField
          control={form.control}
          name="product_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={
                    products ? products.product_name : "No product selected"
                  }
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock amount</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Current stock : ${products.stock?.quantity || "0"}`}
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  value={String(field.value)}
                />
              </FormControl>
              <FormDescription>
                Stock amount cannot be zero or negative.
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

export default EditStock;
