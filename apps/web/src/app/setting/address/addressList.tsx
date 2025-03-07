/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import AddressCard from "./addressCard";
import { callAPI } from "@/config/axios";

interface IAddressListProps {
  token: string;
}

const AddressList: React.FunctionComponent<IAddressListProps> = async ({
  token,
}) => {
  const addresses = async () => {
    try {
      const response = await callAPI.get("/address/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };
  const address = await addresses();
  console.log(address);

  return (
    <div className="flex flex-col">
      {address ? (
        address.map((e: any, i: number) => (
          <AddressCard {...e} token={token} key={i} />
        ))
      ) : (
        <p>No address found</p>
      )}
    </div>
  );
};

export default AddressList;
