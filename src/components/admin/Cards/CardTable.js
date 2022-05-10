import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "../Dropdowns/TableDropdown.js";
import axios from "axios";
import {useAuthState} from "../../../Context";
import UserMoreMenu from "../../UserMoreMenu";

export default function CardTable({ color }) {
  const userDetails = useAuthState();
  const user = userDetails.user;
  const [users, setusers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      console.log(userDetails);
      try {
        const res = await axios.get("http://localhost:8080/user",
            { headers: {"Authorization" : `Bearer ${userDetails.token}`} }
        );
        console.log(res)
        setusers(res.data.users);
      } catch (err) {}
    };
    getUsers();
  }, []);

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
                Users list
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
                  Full name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Followers
                </th>
                <th
                    className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                >
                  Products
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Role
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
              {users.map((user)=>(
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                          // src={require("../../../assets/img/angular.jpg").default}
                          src={ user.image? user.image.includes("http")?user.image:'http://localhost:8080/files/' + user.image : 'http://localhost:8080/files/avatar.jpg' }
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                      ></img>{" "}
                      <span
                          className={
                              "ml-3 font-bold " +
                              +(color === "light" ? "text-blueGray-600" : "text-white")
                          }
                      >
                    {user.email}
                  </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.firstName} {user.lastName}
                     </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.isVerified ? <>  <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}verified</> : <><i className="fas fa-circle text-red-500 mr-2"></i> unverified</>}


                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.followers.length ===  0 ?
                          <>No followers</> :  <>
                            <div className="flex">
                              {user.followers.slice(0,5).map( u =>
                                  (<img
                                      src={users.find(usr => usr._id == u).image ? users.find(usr => usr._id == u).image.includes("https") ? users.find(usr => usr._id == u).image : 'http://localhost:8080/files/' + users.find(usr => usr._id == u).image : 'http://localhost:8080/files/avatar.jpg'}
                                      title={users.find(usr => usr._id == u).email}
                                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                      alt={users.find(usr => usr._id == u).email}/>)

                              )}
                            </div>
                          </>}
                      {/*<div className="flex">*/}
                      {/*  <img*/}
                      {/*      src={require("../../../assets/img/team-1-800x800.jpg")}*/}
                      {/*      alt="..."*/}
                      {/*      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"*/}
                      {/*  ></img>*/}
                      {/*  <img*/}
                      {/*      src={require("../../../assets/img/team-2-800x800.jpg")}*/}
                      {/*      alt="..."*/}
                      {/*      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"*/}
                      {/*  ></img>*/}
                      {/*  <img*/}
                      {/*      src={require("../../../assets/img/team-3-800x800.jpg")}*/}
                      {/*      alt="..."*/}
                      {/*      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"*/}
                      {/*  ></img>*/}
                      {/*  <img*/}
                      {/*      src={require("../../../assets/img/team-4-470x470.png")}*/}
                      {/*      alt="..."*/}
                      {/*      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"*/}
                      {/*  ></img>*/}
                      {/*</div>*/}

                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        {user.products.length}
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        {user.role}
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      {/*<TableDropdown />*/}
                      <UserMoreMenu user={user} />
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

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
