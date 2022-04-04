import React from "react";

// components

import CardSettings from "../../components/admin/Cards/CardSettings.js";
import CardProfile from "../../components/admin/Cards/CardProfile.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Settings() {
  return (
    <>
      <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
            <HeaderStats />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
        </div>
    </>
  );
}
