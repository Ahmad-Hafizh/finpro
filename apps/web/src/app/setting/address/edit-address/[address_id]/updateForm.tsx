"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IUpdateAddressPageProps {
  address_id: string;
  address_name: string;
  address_contact: string;
  country: string;
  city: string;
  street: string;
  post_code: string;
  email: string;
}

const addressSchema = z.object({
  address_name: z.string(),
  address_contact: z.string(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  post_code: z.string(),
});

const UpdateAddressPage: React.FunctionComponent<IUpdateAddressPageProps> = (
  props,
) => {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address_name: props.address_name,
      address_contact: props.address_contact,
      country: props.country,
      city: props.city,
      street: props.street,
      post_code: props.post_code,
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    try {
      const getLatLng = await callAPI.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${values.city}%2C${values.post_code}%2C${values.country}&key=89dd7f045f414b5aa2ff3ee9b18a4c47`,
      );

      const { lat, lng } = getLatLng.data.results[0].geometry;

      const response = await callAPI.patch("/address/update-address", {
        ...values,
        lat: String(lat),
        lng: String(lng),
        email: props.email,
        address_id: parseInt(props.address_id),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="address_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address name</FormLabel>
              <FormControl>
                <Input className="border" placeholder="Home" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address_contact"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address contact</FormLabel>
              <FormControl>
                <Input className="border" placeholder="contact" {...field} />
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
                <Input
                  className="border"
                  placeholder="ex. Indonesia"
                  {...field}
                />
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
                <Input
                  className="border"
                  placeholder="ex. Jakarta"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="street"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input
                  className="border"
                  placeholder="street name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="post_code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post code</FormLabel>
              <FormControl>
                <Input className="border" placeholder="post code" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Address</Button>
      </form>
    </Form>
  );
};

export default UpdateAddressPage;
