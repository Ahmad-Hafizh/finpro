import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const OrderPage = () => {
  return (
    <div className="max-w-5xl py-24">
      <Tabs defaultValue="account" className="">
        <TabsList className="bg-transparent">
          <TabsTrigger value="account" className="selected:shadow-none">
            On Delivery
          </TabsTrigger>
          <TabsTrigger value="password" className="shadow-none">
            Finished
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col">
            <div className="flex gap-4 border p-4">
              <div className="aspect-square h-20 w-20 bg-gray-300"></div>
              <div className="flex w-full flex-col justify-between">
                <div className="flex w-full gap-4">
                  <p className="text-xl">Plaza Surabaya</p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-sm">
                    <p>Total Belanja</p>
                    <p>Rp 200.000</p>
                  </div>
                  <div className="">
                    <Button>Lacak</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 border p-4">
              <div className="">
                <p className="text-xs">12 Februari 2025</p>
                <p className="text-xl">Plaza Surabaya</p>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-sm">
                  <p>Total Belanja</p>
                  <p>Rp 200.000</p>
                </div>
                <div className="">
                  <Button>Detail</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderPage;
