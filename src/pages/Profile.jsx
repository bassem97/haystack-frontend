import React, {useEffect, useState} from "react";
import styled from "styled-components"

import Product from '../components/ProductAlt'
import axios from "axios";

const user  = localStorage.getItem('data') && localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).user

export default function Profile() {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/products/owner/" + user._id
                );
                await setProducts(res.data.products);
            } catch (err) {
            }
        };
        getProducts();
    }, products)

    return (
        <>
            <Banner
                style={{
                    background: `url('${user.cover ? `http://localhost:8080/files/${user.cover}` : 'http://localhost:8080/files/cover.jpg'}') rgba(31, 41, 55, 0.6)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundBlendMode: 'multiply'
                }}
            >

                {/*<Avatar src={user.image?} />*/}
                <Avatar  src={ user.image?'http://localhost:8080/files/' + user.image : 'http://localhost:8080/files/avatar.jpg' } />
                <Title size={3}>{`${user.firstName} ${user.lastName}`}</Title>
                <Title size={1.5}>Level {user.level || 0}</Title>
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
                            ? products.map(product => <Product product={product} />)
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
  width: 250px
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
