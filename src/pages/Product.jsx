import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/carttRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

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
                        <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                            <img
                                src={'http://localhost:8080/files/' + product.image}
                                alt="Product Image"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>

                        {/*Optional Images*/}

                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">

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
