"use client";
import * as React from "react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { callAPI } from "@/config/axios";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IAddressCardProps {
  address_id: number;
  address_name: string;
  address_contact: string;
  street: string;
  city: string;
  token: string;
}

const AddressCard: React.FunctionComponent<IAddressCardProps> = (props) => {
  const onDelete = async (id: number) => {
    try {
      const response = await callAPI.delete(`/address/del-address/${id}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      });
      toast({
        title: "Delete address success",
        description: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full w-full justify-between rounded-lg border p-4">
      <div className="flex flex-col gap-2">
        <p className="text-lg">{props.address_name}</p>
        <div className="leading-tight">
          <p className="text-xs text-gray-500">{props.address_contact}</p>
          <p className="text-xs text-gray-500">
            {props.street}
            {props.city}
          </p>
        </div>
      </div>
      <div className="flex h-full justify-end gap-4">
        <Link
          href={`/setting/address/edit-address/${props.address_id}`}
          className="flex items-center gap-1"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            <X />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(props.address_id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AddressCard;
