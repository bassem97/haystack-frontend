import React, {useEffect, useState} from "react";
import styled from "styled-components"

import Product from '../components/ProductAlt'


// const user  = JSON.parse(localStorage.getItem('data')).user

const user = {
  email: JSON.parse(localStorage.getItem('data')).user.email,
  firstName: JSON.parse(localStorage.getItem('data')).user.firstName || null,
  lastName: JSON.parse(localStorage.getItem('data')).user.lastName,
  // firstName: "Amine",
  // lastName: "Saddem",
  // email: "amine.saddem@esprit.tn",
  // image: "https://media-exp1.licdn.com/dms/image/C4D03AQGd4HSQgO1FQA/profile-displayphoto-shrink_800_800/0/1602410272149?e=1653523200&v=beta&t=B3U9lavz8LPs6Nl4eu-szw_xleaSgVEzR5ldjQpKLOc",
  image: JSON.parse(localStorage.getItem('data')).user.image,
  cover: "https://images.unsplash.com/photo-1476984251899-8d7fdfc5c92c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3700&q=80",
  birthdate: new Date(),
  phone: "20027987",
  bio: "I am here to sell clothes. blablabla lorem this lorem that.",
  level: 66,
  experience: 1256,
  newLevelExperience: 2033,
  followers: ['test'],
  products: [
    {
      label:"maryoul khalaa",
      description:"Un simple débardeur noir. Neuf.",
      image:"https://agnesb-agnesb-com-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/2a31200d83d34ed4a59384bead344b6191777dfc_3111JG13_000_1.jpeg",
      size:"M",
      color:"black",
      price:7
    },
    {
      label:"maryoul khalaa",
      description:"Un simple débardeur blanc. Neuf.",
      image:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F72%2F54%2F72544c5457a3c00e2bb408ddaaafba66298e6ba0.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_tops_vests%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main",
      size:"S",
      color:"white",
      price:6
    },
    {
      label:"maryoul khalaa",
      description:"Un simple débardeur bleu. Neuf.",
      image:"https://m.media-amazon.com/images/I/71nqV9iFmYL._SL1500_.jpg",
      size:"M",
      color:"blue",
      price:7
    }
  ]
}

export default function Profile() {
  return (
    <>
      <Banner>

        {/*<Avatar src={user.image?} />*/}
        <Avatar  src={ user.image?'http://localhost:8080/files/' + user.image : 'http://localhost:8080/files/avatar.jpg' } />
        <Title size={3}>{`${user.firstName} ${user.lastName}`}</Title>
        <Title size={1.5}>Level {user.level}</Title>
      </Banner>

      <Container width='100vw' padding='0px 350px' margin='25px 0px'>
        <Container
          width='33%'
          margin='15px'
          direction='column'
        >
          <Lego>
            <Title size='1.25'>
              About {user.firstName}
            </Title>
            <Text>
              {user.bio}
            </Text>
          </Lego>

          <Lego>
            <Title size='1.25' width='100%'>
              Experience
            </Title>
            
            <div class="w-full bg-gray-200 rounded-full my-1 dark:bg-gray-700">
              <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${parseInt(user.experience / user.newLevelExperience * 100)}%`}}>
                {parseInt(user.experience / user.newLevelExperience * 100)}%
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
          {user.products.map(product => <Product product={product} />)}
        </Container>
      </Container>
    </>
  );
}


const Banner = styled.div`
  width: 100vw;
  background: url('${user.cover}') rgba(31, 41, 55, 0.6);
  background-size: cover;
  background-position: center center;
  background-blend-mode: multiply;

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
