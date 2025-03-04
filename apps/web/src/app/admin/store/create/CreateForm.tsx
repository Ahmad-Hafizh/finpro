"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLabel } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ICreateFormProps {
  token: string;
}

const formSchema = z.object({
  store_name: z.string(),
  store_address: z.string(),
  city: z.string(),
  country: z.string(),
  lat: z.string(),
  lng: z.string(),
});

const CreateForm: React.FunctionComponent<ICreateFormProps> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store_name: "",
      store_address: "",
      city: "",
      country: "",
      lat: "",
      lng: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await callAPI.post(
        "/store/create",
        { ...values },
        { headers: { Authorization: `Bearer ${props.token}` } },
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="store_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="store_address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store address" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store country" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store city" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lat"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store latitude" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lng"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter store longitude" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateForm;
