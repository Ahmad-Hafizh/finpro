/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";

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

export type IAddStock = {
  products: Product[];
  store_id?: number;
  token?: any;
  setOpenDialog: (open: boolean) => void;
};

const AddNewStock = ({
  products,
  store_id,
  token,
  setOpenDialog,
}: IAddStock) => {
  const { toast } = useToast();

  const formSchema = z.object({
    stock: z.any(),
    product_id: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: "",
      product_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      product_id: values.product_id,
      store_id: store_id,
      quantity: values.stock,
    };

    const submitNewStock = await callAPI.post("/stock", payload, {
      headers: { Authorization: `bearer ${token}` },
    });

    if (submitNewStock.status === 200) {
      toast({
        title: "Success",
        description: "Adding Stock Success",
        className: "bg-gradient-to-r from-green-300 to-green-200",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong while adding stock",
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
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select product"
                      className="text-black"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem
                      key={product.product_id}
                      value={product.product_id.toString()}
                    >
                      {product.product_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Pick product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input amount here.."
                  {...field}
                  type="number"
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

export default AddNewStock;
