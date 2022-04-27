import React, {useEffect, useState} from "react";

// components

import CardStats from "../Cards/CardStats.js";
import axios from "axios";
import {useAuthState} from "../../../Context";

export default function HeaderStats() {
  const [productsNumber, setProductsNumber] = useState(0);
  const [soldProductsNumber, setSoldProductsNumber] = useState(0);
  const [usersNumber, setUsersNumber] = useState(0);
  const [ordersNumber, setOrdersNumber] = useState(0);
  const userDetails = useAuthState();

  useEffect(() => {
    const getProductsNumber = async () => {
      try {
        const res = await axios.get(

            "http://localhost:8080/products"
        );
        setProductsNumber(res.data.products.length);
        setSoldProductsNumber(res.data.products.filter(value => value.stock == 0).length);
      } catch (err) {}
    };
    getProductsNumber();
  });

  useEffect(() => {
    const getUsersNumber = async () => {
      try {
        const res = await axios.get(

            "http://localhost:8080/user",
            {
              headers: { Authorization: `Bearer ${userDetails.token}` }
            }
        );
        setUsersNumber(res.data.users.length);
      } catch (err) {}
    };
    getUsersNumber();
  });

  useEffect(() => {
    const getOrdersNumber = async () => {
      try {
        const res = await axios.get(

            "http://localhost:8080/orders",
            {
              headers: { Authorization: `Bearer ${userDetails.token}` }
            }
        );
        setOrdersNumber(res.data.length);
      } catch (err) {}
    };
    getOrdersNumber();
  });
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Users"
                  statTitle={usersNumber.toString()}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Products"
                  statTitle={productsNumber.toString()}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle={ordersNumber.toString()}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Sold Products"
                  statTitle={soldProductsNumber.toString()}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
