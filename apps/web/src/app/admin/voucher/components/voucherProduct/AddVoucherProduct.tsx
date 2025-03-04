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
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";

export type IAddStock = {
  store_id?: number;
  allProduct: any;
  setOpenDialog: (open: boolean) => void;
};

const AddVoucherProduct = ({
  store_id,
  allProduct,
  setOpenDialog,
}: IAddStock) => {
  const { toast } = useToast();

  const formSchema = z
    .object({
      voucher_product_code: z
        .string()
        .nonempty({ message: "Code cannot be empty" }),
      voucher_product_startdate: z.date(),
      voucher_product_enddate: z.date(),
      product_id: z.string().nonempty({ message: "Code cannot be empty" }),
    })
    .refine(
      (data) => data.voucher_product_enddate >= data.voucher_product_startdate,
      {
        message: "End date cannot be before start date",
        path: ["voucher_product_enddate"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucher_product_code: "",
      voucher_product_startdate: new Date(),
      voucher_product_enddate: new Date(),
      product_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      code: values.voucher_product_code,
      startdate: values.voucher_product_startdate.toISOString(),
      enddate: values.voucher_product_enddate.toISOString(),
      product_id: values.product_id,
    };

    const submitNewStock = await callAPI.post("/voucher/product", payload);

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

    // console.log("THIS IS PAYLOAD : ", payload);
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
          name="voucher_product_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Voucher Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input amount here.."
                  {...field}
                  type="text"
                  value={String(field.value)}
                />
              </FormControl>
              <FormDescription>Unique code for the voucher.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_product_startdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Voucher Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"}>
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01") || date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Start of the voucher</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_product_enddate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Voucher End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"}>
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01") || date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>End of the voucher</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
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
                  {allProduct.map((product: any) => (
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

        <Button type="submit">Add voucher</Button>
      </form>
    </Form>
  );
};

export default AddVoucherProduct;
