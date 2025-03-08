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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  address_name: z.string(),
  address_contact: z.string(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  post_code: z.string(),
});

const NewAddressPage = () => {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address_name: "",
      address_contact: "",
      country: "",
      city: "",
      street: "",
      post_code: "",
    },
  });

  const { data: session } = useSession();

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    try {
      const getLatLng = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${values.city}%2C${values.post_code}%2C${values.country}&key=89dd7f045f414b5aa2ff3ee9b18a4c47`,
      );

      const { lat, lng } = getLatLng.data.results[0].geometry;

      const response = await callAPI.post("/address/set-address", {
        ...values,
        lat: String(lat),
        lng: String(lng),
        email: session?.user.email,
      });

      toast({
        title: "update data",
        description: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-5 md:rounded-xl md:border md:p-10">
      <div className="flex w-full flex-col gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
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
                    <Input
                      className="border"
                      placeholder="contact"
                      {...field}
                    />
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
                    <Input
                      className="border"
                      placeholder="post code"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Add Address
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewAddressPage;
