import React from "react";

// components

import MapExample from "../../components/admin/Maps/MapExample.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Maps() {
  return (
    <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <HeaderStats />
        <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <MapExample />
          </div>
        </div>
      </div>
        </div>
    </>
  );
}
