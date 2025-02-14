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
import { call } from "@/app/config/axios";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  store: z.string().optional(),
  position: z
    .string()
    .min(2, {
      message: "Position must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
});

interface EditAdminFormProps {
  adminData: any[];
  setOpenDialog: (open: boolean) => void;
}

const EditAdminForm = ({ adminData, setOpenDialog }: EditAdminFormProps) => {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<any>([]);

  useEffect(() => {
    setAdmin(adminData);
  }, [adminData]);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store: "",
      position: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedValues = {
      admin_id: admin.admin_id,
      account_id: admin.account_id,
      store_id: parseInt(values.store as string) || admin.store_id,
      position: values.position || admin.position,
    };
    submitApi(updatedValues);
    console.log("Payload Edit:", updatedValues);
  }

  const submitApi = async (updatedValues: any) => {
    try {
      const submit = await call.patch("/admin", updatedValues);
      console.log("INI SUBMIT", submit);
      if (submit.data.isSuccess) {
        toast({
          title: "Success",
          description: "Updating Admin Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
      setOpenDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while updating admin",
        variant: "destructive",
      });
    }
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={admin ? admin?.account?.name : "Name"}
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>
                Admin Name (
                <span className="underline">
                  <a>only account owner can change personal information.</a>
                </span>
                ).
              </FormDescription>
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
                <Input
                  placeholder={admin ? admin.phone : "Phone"}
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>
                Admin Phone Number (
                <span className="underline">
                  <a>only account owner can change personal information.</a>
                </span>
                ).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder={admin ? admin?.position : "Position"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Position and specific role of admin.
              </FormDescription>
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
