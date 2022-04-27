import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// components

import axios from "axios";
import TableDropdown from "../Dropdowns/TableDropdown";
import {addProduct} from "../../../redux/carttRedux";
import Axios from "axios";

/*const update = async (order) => {
    order.status = "Pending"
    await axios.put("http://localhost:8080/orders/"+order.id,{order:order})

}*/





export default function CardOrder({ color }) {
    const [orders, setorders] = useState([]);
    const getOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8080/orders",

            );
            setorders(res.data);
        } catch (err) {}

    };
    useEffect(() => {
        getOrders();
    }, []);

    async function sendMail(order) {
        await axios.get("http://localhost:8080/OrderEmail/send/" + order._id);
        getOrders()
    }

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Orders
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }
                            >
                                Email
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }
                            >
                                Amount
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }
                            >
                                Address
                            </th>

                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }
                            >
                                status
                            </th>


                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }
                            ></th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order)=>(
                            <tr>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        {order.email}
                                    </div>
                                </td>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                                    <span
                                        className={
                                            "ml-3 font-bold " +
                                            +(color === "light" ? "text-blueGray-600" : "text-white")
                                        }
                                    >
                    {order.amount} $
                  </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.address.city} , {order.address.country}
                                </td>


                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        {order.status ? <>  <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}Verified</> : <><i className="fas fa-circle text-red-500 mr-2"></i> Pending</>}

                                    </div>
                                </td>

                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        <button onClick={()=> sendMail(order)}>ab3ath</button>
                                    </div>
                                </td>



                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">

                                    </div>
                                </td>

                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <TableDropdown />
                                </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CardOrder.defaultProps = {
    color: "light",
};

CardOrder.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
