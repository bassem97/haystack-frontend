import React from "react";

// components

import CardLineChart from "../../components/admin/Cards/CardLineChart.js";
import CardBarChart from "../../components/admin/Cards/CardBarChart.js";
import CardPageVisits from "../../components/admin/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/admin/Cards/CardSocialTraffic.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Dashboard() {
  return (
    <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <HeaderStats />
            <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
        </div>
    </>
  );
}
