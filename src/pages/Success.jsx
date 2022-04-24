import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import localStorage from "redux-persist/es/storage";
import StripeCheckout from "react-stripe-checkout";

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
                    email : data.billing_details.name,

                });
                setOrderId(res.data._id);

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
            <button onClick={()=> window.location.href="/"} style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
    );
};

export default Success;
