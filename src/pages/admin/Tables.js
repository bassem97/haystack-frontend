import React from "react";

// components

import CardTable from "../../components/admin/Cards/CardTable.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Tables() {
  return (
    <>
      <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <HeaderStats />
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
        </div>
    </>
  );
}
