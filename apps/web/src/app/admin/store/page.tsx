import { Button } from "@/components/ui/button";
import HeaderDashboard from "../components/header";
import { columns } from "./components/column";
import { DataTable } from "./components/data-table";
import { callAPI } from "@/config/axios";

const storePage = async () => {
  const stores = async () => {
    try {
      const response = await callAPI.get("/store");

      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await stores();
  return (
    <>
      <HeaderDashboard pagename="Store Management" />
      <div className="flex">
        <div className="">
          <Button>Create New Store</Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default storePage;
