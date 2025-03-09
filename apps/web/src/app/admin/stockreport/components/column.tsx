import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_category_id: number;
  product_description: string | null;
  deletedAt: string | null;
  stock: any;
  product_img: any[];
  product_category: ProductCategory;
  voucher: any[];
};

export type Stock = {
  stock_id: number;
  store_id: number;
  product_id: number;
  quantity: number;
};

export type ProductCategory = {
  product_category_id: number;
  product_category_name: string;
  deletedAt: string | null;
};

export const columns = (): ColumnDef<any>[] => [
  {
    accessorKey: "product.product_name",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-md font-medium">
          {product.product.product_name}
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Change
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Type
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-md font-medium">{product.type.toUpperCase()}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      console.log("PRODUCT: ", product);
      const date = new Date(product.created_at);
      const formatDate = date.toLocaleDateString("id-ID");
      return <div className="text-md font-medium">{formatDate}</div>;
    },
  },

  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Notes
        </Button>
      );
    },
  },
  {
    accessorKey: "store.store_name",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Store
        </Button>
      );
    },
  },
];
