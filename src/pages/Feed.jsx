import { useEffect, useState } from "react";
import axios from "axios";

import Product from '../components/ProductAlt'

const Feed = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    process.env.REACT_APP_API_URL + "/user/feed/624b77b7a7a94effd792c275"
                );
                await setProducts(res.data.products);
                } catch (err) {
            }
        };
        getProducts();
    }, []);

    return (
        <div className="w-full py-20">
            {products.map(product => <Product product={product} /> )}
        </div>
    )
}

export default Feed