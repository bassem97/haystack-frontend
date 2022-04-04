import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/admin/Navbars/AdminNavbar.js";
import Sidebar from "../components/admin/Sidebar/Sidebar.js";
import HeaderStats from "../components/admin/Headers/HeaderStats.js";
import FooterAdmin from "../components/admin/Footers/FooterAdmin.js";

// views

import Dashboard from "../pages/admin/Dashboard.js";
import Maps from "../pages/admin/Maps.js";
import Settings from "../pages/admin/Settings.js";
import Tables from "../pages/admin/Tables.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/admin/dashboard"  element={<Dashboard/>} />
            <Route path="/admin/maps"  element={<Maps/>} />
            <Route path="/admin/settings"  element={<Settings/>} />
            <Route path="/admin/tables"  element={<Tables/>} />
            {/*<Redirect from="/admin" to="/admin/dashboard" />*/}
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
