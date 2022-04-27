import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component'
import Product from '../components/ProductAlt'
import Spinner from '../components/Spinner'
import {useAuthState} from "../Context";

const Feed = () => {
    const [products, setProducts] = useState([]);
    const [step, setStep] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const userDetails = useAuthState();
    const user = userDetails.user;
    const getProducts = async () => {
        const res = await axios.get(
            process.env.REACT_APP_API_URL + `/user/feed/${user._id}/${step}`
        );

        if(res.data.products.length > 0) {
            setProducts([...products, ...res.data.products]);
            setStep(step + 3);
        }
        else{
            setHasMore(false);
        }

        console.log(products, step, hasMore)
    };

    useEffect(() => {
        (async () => {const res = await axios.get(
            process.env.REACT_APP_API_URL + `/user/feed/${user._id}`
        );

        if(res.data.products.length > 0) {
            setProducts([...products, ...res.data.products]);
            setStep(step + 3);
        }
        else{
            setHasMore(false);
        }

        console.log(products, step, hasMore)})()
    }, []);

    return (
        <InfiniteScroll
            dataLength={products.length} //This is important field to render the next data
            next={getProducts}
            hasMore={hasMore}
            loader={<div className="my-12 w-full flex justify-center"><Spinner /></div>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>!أرجع غدوة</b>
                </p>
            }

            className="px-80"
        >
            {products.map((product, index) => <Product key={index} product={product} />)}
        </InfiniteScroll>
    )
}

export default Feed
