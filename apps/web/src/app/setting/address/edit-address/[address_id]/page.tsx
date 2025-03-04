import { callAPI } from "@/config/axios";
import UpdateAddressPage from "./updateForm";
import { auth } from "@/auth";

interface EditAddressPage {
  params: Promise<{ address_id: string }>;
}

const EditAddressPage = async ({ params }: EditAddressPage) => {
  const address_id = (await params).address_id;
  const session = await auth();

  const getAddressData = async () => {
    try {
      const response = await callAPI.get(`/address/get-address/${address_id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.auth_token}`,
        },
      });

      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const address = await getAddressData();
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl">Edit Address</p>
      <div className="flex flex-col gap-2">
        <UpdateAddressPage
          {...address}
          email={session?.user.email}
          address_id={address_id}
        />
      </div>
    </div>
  );
};

export default EditAddressPage;
