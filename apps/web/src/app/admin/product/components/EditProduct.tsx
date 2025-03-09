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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";

interface EditAdminFormProps {
  productData: any;
  token: string;
  setOpenDialog: (open: boolean) => void;
}

export const EditProduct = ({
  productData,
  setOpenDialog,
  token,
}: EditAdminFormProps) => {
  const { toast } = useToast();
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    setProduct(productData);
    form.reset(productData);
    form.setValue(
      "category",
      productData.product_category.product_category_name,
    );
  }, [productData]);

  const category = [
    "Dry vegetable",
    "Fruit",
    "Wet vegetable",
    "Green vegetable",
    "Nut",
  ];
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Product name must atleasy 2 characters!",
      })
      .optional(),
    price: z
      .preprocess(
        (val) => Number(val),
        z
          .number()
          .min(1, {
            message: "Minimum price is 1! Price cannot be negative!",
          })
          .int("Must be whole number")
          .optional(),
      )
      .optional(),
    description: z
      .string()
      .nonempty({ message: "Description cannot be empty!" })
      .min(10, { message: "Decription minimum has 10 word" }),

    category: z
      .string()
      .nonempty({ message: "Category is required!" })
      .optional(),
    images: z
      .array(
        z.custom<File>((file) => file instanceof File, {
          message: "Invalid file format!",
        }),
      )
      .refine(
        (files) =>
          files.every((file) =>
            ["image/jpeg", "image/png", "image/gif"].includes(file.type),
          ),
        { message: "Only JPG, PNG, and GIF files are allowed!" },
      )
      .refine((files) => files.every((file) => file.size <= 1024 * 1024), {
        message: "Each file must be under 1MB!",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productData?.product_name ?? "",
      price: productData?.product_price ?? "",
      description: productData?.product_description ?? "",
      category: productData?.product_category?.product_category_name ?? "",
      images: productData?.images || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedFields = {
      name: values.name ?? product.name,
      price: values.price ?? product.price,
      description: values.description ?? product.description,
      category: values.category ?? product.category,
      images: values.images ?? product.images,
    };

    const formData = new FormData();

    formData.append("product_id", productData?.product_id);
    formData.append("product_name", values.name || productData?.product_name);
    formData.append(
      "product_price",
      (values.price || productData?.product_price).toString(),
    );
    formData.append(
      "product_description",
      values.description || productData?.product_description,
    );
    formData.append(
      "product_category",
      values.category || productData?.product_category?.product_category_name,
    );

    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => formData.append("product_image", file));
    }

    try {
      const response = await callAPI.patch("/product/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.isSuccess) {
        toast({
          title: "Success",
          description: "Updating Product Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
      setOpenDialog(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while updating product",
        variant: "destructive",
      });
      setOpenDialog(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const updatedImages = [...(form.getValues("images") || []), ...fileArray];
    form.setValue("images", updatedImages, { shouldValidate: true });
    form.trigger("images");
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
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    product?.name ? product?.name : "Name cannot be the same.."
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Note: Product name cannot be the same.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    product?.price
                      ? product?.price.toString()
                      : "Name cannot be the same.."
                  }
                  {...field}
                  type="number"
                  value={field.value}
                />
              </FormControl>
              <FormDescription>This is product price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    product?.description
                      ? product?.description
                      : "Tell user about your product"
                  }
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Tell user about the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={
                  productData?.product_category?.product_category_name
                    ? productData?.product_category?.product_category_name
                    : ""
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a category"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {category.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>Assign category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={handleImageUpload}
                  name={field.name}
                />
              </FormControl>
              <FormDescription>Re-upload images here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">LOLOLOL</Button>
      </form>
    </Form>
  );
};

export default EditProduct;
