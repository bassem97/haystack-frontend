import { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, color, sort, search }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(

                    "http://localhost:8080/products"
                );
                setProducts(res.data.products);
                setFilteredProducts(res.data.products)
            } catch (err) {}
        };
        getProducts();
    }, [cat]);

   /* useEffect(() => {
        cat &&
        setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters]);*/

/*    useEffect(() => {
        setFilteredProducts(products);
        setFilteredProducts((prev) =>
        [...prev].filter(value => (value.name.toUpperCase().includes(search.toUpperCase())) || (value.description.toUpperCase().includes(search.toUpperCase())) || (value.price.toString().toUpperCase().includes(search.toUpperCase()))))
    }, [search])*/

   /* useEffect(() => {
        setFilteredProducts(products);
        console.log("color")
        console.log(color)
        if (color !== "")
            setFilteredProducts((prev) =>
                [...prev].filter(value => value.color == color)
            );
    }, [color]);*/

    useEffect(() => {
        setFilteredProducts(products);
        if (color !== "")
            setFilteredProducts((prev) =>
                [...prev].filter(value => value.color == color)
            );

        setFilteredProducts((prev) =>
            [...prev].filter(value => (value.name.toUpperCase().includes(search.toUpperCase())) || (value.description.toUpperCase().includes(search.toUpperCase())) || (value.price.toString().toUpperCase().includes(search.toUpperCase()))))

        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort, color, search]);

    return (
        /*<Container className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">>
            {/!*{cat
                ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
                : products
                    .slice(0, 8)
                    .map((item) => <Product item={item} key={item.id} />)}*!/}
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {products.map((item) => <div className="group relative"><Product item={item} key={item.id} /> </div>)}
        </Container>*/


        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                    src={'http://localhost:8080/files/' + product.image}
                                    alt="Image"
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={`/product/${product._id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price} DT</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
