import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component'
import Product from '../components/ProductAlt'
import {useAuthState} from "../Context";

const Feed = () => {
    const [products, setProducts] = useState([]);
    const [step, setStep] = useState(3);
    const [hasMore, setHasMore] = useState(true);
    const userDetails = useAuthState();
    const user = userDetails.user;
    const getProducts = async () => {
        const res = await axios.get(
            process.env.REACT_APP_API_URL + `/user/feed/${user._id}/${step}`
        );

        if(res.data.products.length > 0) {
            setProducts([...products, ...res.data.products]);
            setStep(step + 1);
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
            setStep(step + 1);
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
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {products.map((product, index) => <Product key={index} product={product} />)}
        </InfiniteScroll>
    )
}

export default Feed
