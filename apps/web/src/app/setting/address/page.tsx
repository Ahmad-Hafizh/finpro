import { auth } from "@/auth";
import Link from "next/link";
import AddressList from "./addressList";

const AddressPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="w-full max-w-3xl rounded-xl md:border md:p-10">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p className="text-3xl">Address</p>
          <Link href="/setting/address/new-address">New Address</Link>
        </div>
        <AddressList token={session?.user.auth_token} />
      </div>
    </div>
  );
};

export default AddressPage;
