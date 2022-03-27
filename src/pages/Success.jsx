import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import localStorage from "redux-persist/es/storage";

const Success = () => {

    const location = useLocation();
    console.log(location)
    const cart = location.state.cart;
    const data = location.state.stripeData;


    // const currentUser = localStorage.getItem('user').userId;
    const [orderId, setOrderId] = useState(null);


    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    user: "623b7f6dfcfc58398a7c7d5d",
                    products: cart.products.map((item) => ({
                        _id: item._id
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
                console.log("SUCESSS  29 res"+res);
            } catch {}
        };
        data && createOrder();
    }, [cart, data]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
    );
};

export default Success;
