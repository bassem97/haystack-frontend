import React from "react";

// components

import CardComplaint from "../../components/admin/Cards/CardComplaint.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Complaints() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <CardComplaint color="dark" />
                    </div>
                </div>
            </div>
        </>
    );
}
