import React from "react";

// components

import CardOrder from "../../components/admin/Cards/CardOrder.js";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import HeaderStats from "../../components/admin/Headers/HeaderStats";

export default function Orders() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <CardOrder color="dark" />
                    </div>
                </div>
            </div>
        </>
    );
}
