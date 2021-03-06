import styled from "styled-components";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {mobile} from "../responsive";
import {useLocation} from "react-router";
import {useState} from "react";
import {useAuthState} from "../Context";
import { RadioGroup } from '@headlessui/react'

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const  colors =  [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ];
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [search, setSearch] = useState("");
    const [color, setColor] = useState("");
    const userDetails = useAuthState();
    const user = userDetails.user;
    console.log(user);

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
        console.log(e.target.value)
    };

    return (
        <Container>
            <Title>{cat}</Title>
            <FilterContainer>
                 <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select  onChange={(e) => setColor(e.target.value)}>
                        <Option selected value="">All</Option>
                        <Option value="red">Red</Option>
                        <Option value="yellow">Yellow</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="purple">Purple</Option>
                        <Option value="green">Green</Option>
                    </Select>
                    {/*<Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>*/}
                </Filter>
                <Filter>
                    <input
                        type="search"
                        className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                        id="exampleSearch"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} color={color} sort={sort} search={search}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default ProductList;
