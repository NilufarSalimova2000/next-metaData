"use client";

import React, { useState } from "react";
import { WarehouseList } from "@/app/warehouse/warehouse-list";
import { CategoryList } from "./references/category/category-list";
import { ControllerList } from "./references/requirement-controller/controller-list";

const Warehouse = () => {
  const [activeTab, setActiveTab] = useState("warehouse");

  return (
    <div className="px-[40px]">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 text-lg ${
            activeTab === "warehouse"
              ? "border-b-[3px] border-[#1814f3] text-[#1814f3] text-[16px] font-[500]"
              : "text-[#718ebf]"
          }`}
          onClick={() => setActiveTab("warehouse")}
        >
          Warehouses
        </button>
        <button
          className={`py-2 px-4 text-lg ${
            activeTab === "category"
              ? "border-b-[3px] border-[#1814f3] text-[#1814f3] text-[16px] font-[500]"
              : "text-[#718ebf]"
          }`}
          onClick={() => setActiveTab("category")}
        >
          Categories
        </button>
        <button
          className={`py-2 px-4 text-lg ${
            activeTab === "requirement-controller"
              ? "border-b-[3px] border-[#1814f3] text-[#1814f3] text-[16px] font-[500]"
              : "text-[#718ebf]"
          }`}
          onClick={() => setActiveTab("requirement-controller")}
        >
          Requirements
        </button>
      </div>

      <div className="py-6">
        {activeTab === "warehouse" && <WarehouseList />}
        {activeTab === "category" && <CategoryList />}
        {activeTab === "requirement-controller" && <ControllerList />}
      </div>
    </div>
  );
};

export default Warehouse;
