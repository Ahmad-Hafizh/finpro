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
import { useToast } from "@/hooks/use-toast";
import { callAPI } from "@/config/axios";

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
  adminData: any;
  storeData: any[];
  setOpenDialog: (open: boolean) => void;
}

const EditAdminForm = ({
  adminData,
  storeData,
  setOpenDialog,
}: EditAdminFormProps) => {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<any>([]);

  useEffect(() => {
    setAdmin(adminData);
  }, [adminData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store: "",
      position: "",
    },
  });

  console.log("ADMIN DATA : ", admin);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("ini test : ", admin);
    const updatedValues = {
      admin_id: admin.admin_id,
      user_id: admin.user_id,
      store_id: parseInt(values.store as string) || admin.store_id,
      position: values.position || admin.position,
    };
    console.log("Payload Edit:", updatedValues);
    submitApi(updatedValues);
  }

  const submitApi = async (updatedValues: any) => {
    try {
      const submit = await callAPI.patch("/admin", updatedValues);
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
        className="my-5 flex flex-col gap-0 space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={admin ? adminData[0]?.user?.name : "Name"}
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
                  {storeData.map((store: any) => {
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
