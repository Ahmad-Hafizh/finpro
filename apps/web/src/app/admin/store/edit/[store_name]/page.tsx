import * as React from "react";
import { callAPI } from "@/config/axios";
import EditForm from "./EditForm";
import { auth } from "@/auth";

interface IEditStorePageProps {
  params: Promise<{ store_name: string }>;
}

const EditStorePage: React.FunctionComponent<IEditStorePageProps> = async ({
  params,
}) => {
  const session = await auth();
  const store_name = (await params).store_name;
  const getStore = async () => {
    try {
      const response = await callAPI.post(`/store/get-store-by-name`, {
        store_name: decodeURI(store_name),
      });

      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const store = await getStore();
  return (
    <div className="flex flex-col gap-5 py-20">
      <p className="text-xl">Edit store</p>
      <EditForm {...store} token={session?.user.auth_token} />
    </div>
  );
};

export default EditStorePage;
