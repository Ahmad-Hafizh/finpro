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
  allStore: any;
  setOpenDialog: (open: boolean) => void;
};

const AddVoucherOngkir = ({ store_id, allStore, setOpenDialog }: IAddStock) => {
  const { toast } = useToast();

  const formSchema = z
    .object({
      voucher_ongkir_code: z
        .string()
        .nonempty({ message: "Code cannot be empty" }),
      voucher_ongkir_nominal: z.coerce
        .number()
        .min(1, "Number cannot be zero or negative number"),
      voucher_ongkir_startdate: z.date(),
      voucher_ongkir_enddate: z.date(),
      store_id: z.string().nonempty({ message: "Code cannot be empty" }),
    })
    .refine(
      (data) => data.voucher_ongkir_enddate >= data.voucher_ongkir_startdate,
      {
        message: "End date cannot be before start date",
        path: ["voucher_ongkir_enddate"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucher_ongkir_code: "",
      voucher_ongkir_nominal: 0,
      voucher_ongkir_startdate: new Date(),
      voucher_ongkir_enddate: new Date(),
      store_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      code: values.voucher_ongkir_code,
      nominal: values.voucher_ongkir_nominal,
      startdate: values.voucher_ongkir_startdate.toISOString(),
      enddate: values.voucher_ongkir_enddate.toISOString(),
      store_id: store_id ? store_id : values.store_id,
    };

    const submitNewStock = await callAPI.post("/voucher/ongkir", payload);

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
          name="voucher_ongkir_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ongkir Voucher Code</FormLabel>
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
          name="voucher_ongkir_nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ongkir Voucher Nominal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input amount here.."
                  {...field}
                  type="number"
                  value={Number(field.value)}
                />
              </FormControl>
              <FormDescription>The deducted amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voucher_ongkir_startdate"
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
          name="voucher_ongkir_enddate"
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
          name="store_id"
          render={({ field }) => {
            const selectedStore = allStore.find(
              (store: any) => store.store_id === (store_id || field.value),
            );

            return (
              <FormItem>
                <FormLabel>Store</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={String(field.value)}
                  disabled={!!store_id}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedStore
                            ? selectedStore.store_name
                            : "Select Store"
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
                <FormDescription>Pick store</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit">Add voucher</Button>
      </form>
    </Form>
  );
};

export default AddVoucherOngkir;
