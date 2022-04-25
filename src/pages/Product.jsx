import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import {NavLink, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/carttRedux";
import { useDispatch } from "react-redux";
import {useAuthState} from "../Context";
import {useNavigate} from "react-router";

const Container = styled.div``;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const userDetails = useAuthState();
    const user = userDetails.user;
    console.log(userDetails);
    const navigate = useNavigate();

    //const connectedUser = (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).user)
    //const connectedUser = useAuthState().user;


    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/" + id);
                setProduct(res.data.product);
            } catch {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const deleteProduct = async () => {
        await publicRequest.delete("/products/" + id).then(() => {
            navigate('/products');
    });
    }

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
    };
    return (
        <Container>
            <div className="bg-white">
                <div className="pt-6">

                    {/* Image gallery */}
                    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                            <img
                                src={'http://localhost:8080/files/' + product.image}
                                alt="Product Image"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>

                        {/*Optional Images*/}

                        <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">

                            {/*Image 0*/}

                            {product.optional_images &&
                                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">

                                    <img
                                        src={'http://localhost:8080/files/' + product.optional_images[0]}
                                        alt="Image"
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                            }

                            {/*Image 1*/}

                            {product.optional_images &&
                                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">

                                    <img
                                        src={'http://localhost:8080/files/' + product.optional_images[1]}
                                        alt="Image"
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                            }

                            {/*Image 2*/}

                            {product.optional_images &&
                                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                    <img
                                        src={'http://localhost:8080/files/' + product.optional_images[2]}
                                        alt="Image"
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">{product.price} DT</p>

                                {product.stock > 0 ?
                                    <button onClick={handleClick}
                                        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add to bag
                                    </button>
                                    : <p>Out of Stock !</p>
                                }

                            {user != null && product.owner == user._id &&
                                <div>
                                <NavLink to={"/updateProduct/" + product._id}>
                                <button
                                        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Update Product
                                </button>
                                </NavLink>









                                    <button className="mt-10 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    >
                                    Delete Product
                                    </button>
                                {showModal ? (
                                    <>
                                    <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {product.name}
                                    </h3>
                                    <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                    >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                    </button>
                                    </div>
                                {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    Are you sure you want to delete this product ?
                                    </p>
                                    </div>
                                {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    >
                                    No
                                    </button>
                                    <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => deleteProduct()}
                                    >
                                    Yes
                                    </button>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                    ) : null}

                                </div>
                            }
                        </div>

                        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
