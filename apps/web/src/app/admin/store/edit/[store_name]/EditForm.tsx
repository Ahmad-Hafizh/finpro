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

interface IEditFormProps {
  store_id: number | string;
  store_name: string;
  store_address: string;
  city: string;
  country: string;
  lat: string;
  lng: string;
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

const EditForm: React.FunctionComponent<IEditFormProps> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store_name: props.store_name,
      store_address: props.store_address,
      city: props.city,
      country: props.country,
      lat: props.lat,
      lng: props.lng,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await callAPI.patch(
        "/store/update",
        {
          ...values,
          store_id: props.store_id,
        },
        {
          headers: { Authorization: `Bearer ${props.token}` },
        },
      );

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await callAPI.delete(`/store/delete/${props.store_id}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      });

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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="button" onClick={onDelete}>
          Delete Store
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditForm;
