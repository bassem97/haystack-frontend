import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Product from '../components/ProductAlt'
import axios from "axios";

import { useParams } from "react-router-dom"
import {useAuthState} from "../Context";

export default function Profile() {
    const params = useParams()
    //const connectedUser = (localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).user._id)
    const userDetails = useAuthState();
    const connectedUser = userDetails.user;

    let [products, setProducts] = useState([]);

    let [user, setUser] = useState({
        _id: params.userId || connectedUser._id,
        bio: "", email: "",
        experience: 0,
        firstName: "",
        lastName: "",
        image: "avatar.jpg",
        level: 0,
        newLevelExperience: 0,
        followers: [],
        products: []
    })

    let [prompt, setPrompt] = useState('⏳')

    const handleFollow = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/${prompt}`, {
            id: connectedUser._id,
            followerId: params.userId
        })

        setPrompt(prompt === 'unfollow' ? 'follow' : 'unfollow')
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    process.env.REACT_APP_API_URL+"/products/owner/" + user._id
                );
                await setProducts(res.data.products);
            } catch (err) {
            }
        };
        getProducts();

        (async () => {
            const newUser = await axios.get(`${process.env.REACT_APP_API_URL}/user/${user._id}`)
            setUser(newUser.data.user)
        })()

        //prompt set up
        if(params.userId)
            axios
                .get(`${process.env.REACT_APP_API_URL}/user/${connectedUser._id}/following/${params.userId}`)
                .then(res => {
                    setPrompt(res.data.following ? 'unfollow' : 'follow')
                })

    }, [user._id, connectedUser, params.userId])

    // useEffect(() => console.log(user), [user])

    return (
        <>
            <Banner
                style={{
                    background: `url('${user.cover ? `http://localhost:8080/files/${user.cover}` : 'http://localhost:8080/files/cover.jpg'}') rgba(31, 41, 55, 0.6) center center / cover no-repeat fixed`,
                    backgroundPosition: 'center center',
                    backgroundBlendMode: 'multiply',
                    backgroundSize: 'cover',
                }}
            >

                {/*<Avatar src={user.image?} />*/}
                <Avatar  src={ user.image? user.image.includes("http")?user.image:'http://localhost:8080/files/' + user.image : 'http://localhost:8080/files/avatar.jpg' } />
                <Title size={3}>{`${user.firstName} ${user.lastName}`}</Title>
                <Title size={1.5}>Level {user.level || 0}</Title>
                {
                    (params.userId) &&
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-6 w-24 text-sm"
                        onClick={handleFollow}
                    >
                        {prompt}
                    </button>
                }
            </Banner>

            <Container width='100vw' padding='0px 350px' margin='25px 0px'>
                <Container
                    width='33%'
                    margin='15px'
                    direction='column'
                >
                    <Lego>
                        <Title size='1.25' width='100%'>
                            About {user.firstName}
                        </Title>
                        <Text>
                            {user.bio || `${user.firstName} just landed in Haystack!` }
                        </Text>
                    </Lego>

                    <Lego>
                        <Title size='1.25' width='100%'>
                            Experience
                        </Title>

                        <div className="w-full bg-gray-200 rounded-full my-1 dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${user.newLevelExperience ? parseInt(user.experience / user.newLevelExperience * 100) : user.newLevelExperience}%`}}>
                                {user.newLevelExperience ? parseInt(user.experience / user.newLevelExperience * 100) : user.newLevelExperience}%
                            </div>
                        </div>
                    </Lego>

                    <Lego>
                        <Title size='1.25' width='100%'>
                            Followers
                        </Title>
                        <Text>
                            {user.followers.length}
                        </Text>
                    </Lego>
                </Container>
                <Container
                    width='66%'
                    direction='column'
                >
                    {
                        products.length > 0
                            ? products.map((product, index) => <Product key={index} product={product} />)
                            : <h1 className="text-2xl text-center">No products yet...</h1>
                    }
                </Container>
            </Container>
        </>
    );
}


const Banner = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 100px 0 25px 0;
  box-shadow: 0px 2px 15px rgb(31, 41, 55);
`

const Avatar = styled.img`
  border-radius: 50%;
  border: 7px solid white;
  width: 250px;
  height: 250px;
`

const Title = styled.h1`
  color: white;
  font-size: ${props => props.size || 3}rem;
  display: block;
  width: ${props => props.width || 'auto'}
`

const Text = styled.p`
  font-size: 1em;
  color: ${props => props.color || 'white'}
`

const Container = styled.div`
  margin-top: 25px;
  width: ${props => props.width || 'auto'};
  padding: ${props => props.padding || 'auto'};
  margin-right: ${props => props.marginRight || 'auto'};
  margin: ${props => props.margin || 'auto'};

  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};

  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'no-wrap'};

  background-color: ${props => props.backgroundColor || 'none'};
  border-radius: ${props => props.radius || '0px'};

  box-shadow: ${props => props.shadow || 'none'}
`

const Lego = styled(Container)`
  background-color: #1f2937DD;
  border-radius: 5px;
  padding: 10px;
  margin: 0px 0px 15px;
  flex-wrap: wrap;
  box-shadow: 0px 2px 5px rgb(31, 41, 55)
`
