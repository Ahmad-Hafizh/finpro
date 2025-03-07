import { auth } from "@/auth";
import Link from "next/link";
import AddressList from "./addressList";
import { MapPinPlus } from "lucide-react";

const AddressPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="w-full max-w-2xl rounded-xl md:border md:p-10">
      <div className="flex flex-col gap-10">
        <Link
          href="/setting/address/new-address"
          className="flex h-fit w-full items-center justify-center gap-2 rounded-md border-2 py-2 text-xl font-medium"
        >
          <MapPinPlus className="h-5 w-5" />
          New Address
        </Link>
        <AddressList token={session?.user.auth_token} />
      </div>
    </div>
  );
};

export default AddressPage;
