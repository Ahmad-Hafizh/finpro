"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { callAPI } from "@/config/axios";
import Link from "next/link";

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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full w-full justify-between rounded-lg border p-4">
      <div className="flex flex-col gap-2">
        <p className="text-xl">{props.address_name}</p>
        <div className="leading-tight">
          <p>{props.address_contact}</p>
          <p>
            {props.street}
            {props.city}
          </p>
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-between">
        <Button variant={"link"} onClick={() => onDelete(props.address_id)}>
          <X />
        </Button>
        <Link
          href={`/setting/address/edit-address/${props.address_id}`}
          className="flex"
        >
          <Pencil />
          Edit
        </Link>
      </div>
    </div>
  );
};

export default AddressCard;
