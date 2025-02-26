import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
import { auth } from "@/auth";
import Link from "next/link";

const AddressPage = async () => {
  const session = await auth();

  const addresses = async () => {
    try {
      const response = await callAPI.post("/address/get-address", {
        email: session?.user.email,
      });

      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const address = await addresses();
  return (
    <div className="w-full max-w-3xl rounded-xl md:border md:p-10">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p className="text-3xl">Address</p>
          <Link href="/setting/address/new-address">New Address</Link>
        </div>
        <div className="flex flex-col">
          {address[0] ? (
            address.map((e: any, i: number) => (
              <div
                className="flex h-full w-full justify-between rounded-lg border p-4"
                key={i}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xl">Home</p>
                  <div className="leading-tight">
                    <p>0123456789</p>
                    <p>
                      {e.street}, {e.city}
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-col items-end justify-between">
                  <Button variant={"link"}>X</Button>
                  <div className="flex">
                    <Button variant={"link"}>Edit</Button>
                    <Button>Select</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No address found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
