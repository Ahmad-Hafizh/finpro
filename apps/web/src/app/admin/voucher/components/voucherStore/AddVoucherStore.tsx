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
import { useState } from "react";

export type IAddStock = {
  store_id?: number;
  allStore: any;
  token: string;
  setOpenDialog: (open: boolean) => void;
};

const AddVoucherStore = ({
  store_id,
  allStore,
  token,
  setOpenDialog,
}: IAddStock) => {
  const { toast } = useToast();
  const [voucherType, setVoucherType] = useState<string>("percentage");

  const formSchema = z
    .object({
      voucher_store_code: z
        .string()
        .nonempty({ message: "Code cannot be empty" }),
      voucher_store_amount_percentage: z.string().refine(
        (value) => {
          const number = Number(value);
          return !isNaN(number) && number >= 0 && number <= 100;
        },
        { message: "Percentage must be between 0 and 100" },
      ),
      voucher_store_exact_nominal: z.string(),
      voucher_store_minimum_buy: z.string(),
      voucher_store_maximum_nominal: z.string(),
      voucher_store_startdate: z.date(),
      voucher_store_enddate: z.date(),
      store_id: z.string().nonempty({ message: "Code cannot be empty" }),
    })
    .refine(
      (data) => data.voucher_store_enddate >= data.voucher_store_startdate,
      {
        message: "End date cannot be before start date",
        path: ["voucher_store_enddate"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucher_store_code: "",
      voucher_store_amount_percentage: "",
      voucher_store_exact_nominal: "",
      voucher_store_minimum_buy: "",
      voucher_store_maximum_nominal: "",
      voucher_store_startdate: new Date(),
      voucher_store_enddate: new Date(),
      store_id: store_id ? String(store_id) : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      code: values.voucher_store_code,
      amount_percentage: values.voucher_store_amount_percentage,
      exact_nominal: values.voucher_store_exact_nominal,
      minimum_buy: values.voucher_store_minimum_buy,
      maximum_nominal: values.voucher_store_maximum_nominal,
      startdate: values.voucher_store_startdate.toISOString(),
      enddate: values.voucher_store_enddate.toISOString(),
      store_id: values.store_id,
    };

    const submitNewStock = await callAPI.post("/voucher/store", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

    // console.log("THIS IS PAYLOAD : ", payload);
    setOpenDialog(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="voucher_store_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Voucher Code</FormLabel>
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
        <FormItem>
          <FormLabel>Voucher Type</FormLabel>
          <Select
            onValueChange={(value) =>
              setVoucherType(value as "exact" | "percentage")
            }
            defaultValue={voucherType}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select voucher type"
                  defaultValue={"percentage"}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="exact">Exact Nominal Discount</SelectItem>
              <SelectItem value="percentage">Percentage Discount</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="voucher_store_amount_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Percentage</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input percentage discount amount here.."
                  {...field}
                  type="number"
                  value={String(field.value)}
                  disabled={voucherType === "exact"}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Percentage discount. Form represent percent (%)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_store_maximum_nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher maximum amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input exact nominal amount here.."
                  {...field}
                  type="text"
                  value={String(field.value)}
                  disabled={voucherType === "exact"}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Maximum amount of discount, only fill this in accordance with
                percentage.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_store_exact_nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Exact Nominal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input exact nominal amount here.."
                  {...field}
                  type="text"
                  value={String(field.value)}
                  disabled={voucherType === "percentage"}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Exact discount nominal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_store_minimum_buy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher minimum buy</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input exact nominal amount here.."
                  {...field}
                  type="text"
                  value={String(field.value)}
                />
              </FormControl>
              <FormDescription className="text-xs">
                If empty, minimum buy is 0.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voucher_store_startdate"
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
              <FormDescription className="text-xs">
                Start of the voucher
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_store_enddate"
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
              <FormDescription className="text-xs">
                End of the voucher
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store_id"
          render={({ field }) => {
            const selectedStore = allStore.find(
              (store: any) => store.store_id === store_id,
            );
            return (
              <FormItem>
                <FormLabel>Store</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={store_id ? store_id.toString() : field.value}
                  disabled={!!store_id}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedStore?.store_name || "Select store"
                        }
                        className="text-black"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allStore.map((store: any) => (
                      <SelectItem
                        key={store.store_id}
                        value={store.store_id.toString()}
                      >
                        {store.store_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Pick store
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="col-span-2 mt-5 flex w-full justify-center">
          <Button type="submit" className="w-full">
            Add Voucher
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddVoucherStore;
