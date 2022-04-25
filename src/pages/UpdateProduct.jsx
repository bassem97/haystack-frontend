import styled from "styled-components";
import {useEffect, useState} from "react";
import {mobile} from "../responsive";
import { publicRequest } from "../requestMethods";
import {useNavigate} from "react-router";
import Select from 'react-select';
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useAuthState} from "../Context";

const UpdateProduct = () => {



    // const user = (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).user)
    const userDetails = useAuthState();
    const user = userDetails.user;
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/" + id);
                setProduct(res.data.product);
            } catch {}
        };
        getProduct();
    }, []);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const [categoriesList, setCategoriesList] = useState([]);
    const [options, setOptions] = useState([]);
    // maps the appropriate column to categories  fields property



    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(

                    "http://localhost:8080/category"
                );
                setCategoriesList(res.data.categories);
                res.data.categories.forEach(value => {
                    options.push({value: value._id, label: value.name})
                })
            } catch (err) {}
        };
        getCategories();
    }, []);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categories: [categoriesList],
        image: "",
        optional_images: [],
        owner: user._id
    });
    let imageFormData = new FormData();

    const [errors, setErrors] = useState({visible: false, message: ""});


    const onChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    };

    const onChangeCategory = (e) => {
        const result = [];
        e.forEach(x => result.push(x.value));
        setProduct({...product, categories: result});
    };


    const onChangeFile = async (e) => {
        console.log(e.target.files[0]);


        if (e.target.files[0] !== undefined) {
            try {

                const uploadedFile = e.target.files;
                for (let i = 0; i < uploadedFile.length; i++) {
                    imageFormData.append('uploads[]', uploadedFile[i], uploadedFile[i].name);
                }
                const res = await publicRequest.post(
                    "/uploads",
                    imageFormData
                );
                console.log(res.data.name);
                setProduct({...product, image: res.data.name});
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onChangeMultipleFiles = async (e) => {
        console.log(e.target.files);


        if (e.target.files[0] !== undefined) {
            try {

                const uploadedFile = e.target.files;
                for (let i = 0; i < uploadedFile.length; i++) {
                    imageFormData = new FormData();
                    imageFormData.append('uploads[]', uploadedFile[i], uploadedFile[i].name);
                    const res = await publicRequest.post(
                        "/uploads",
                        imageFormData
                    );
                    console.log(res.data.name);
                    optional_images.push(res.data.name)
                }

            } catch (e) {
                console.log(e);
            }
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.put(
                "/products/" + product._id,
                product,
                {
                    headers: { Authorization: `Bearer ${userDetails.token}` }
                },
            ).then(() => {
                navigate('/products');
            });
        } catch (err) {
            console.log(err);
        }
    };

    const {name, description, price, image, optional_images, categories} = product;

    return (
        <Wrapper>
            <Title>Add new product</Title>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    {errors.visbile && <FormError>{errors.message}</FormError>}
                </FormGroup>
                <FormGroup>
                    <FormField
                        type="text"
                        name="name"
                        placeholder="name"
                        value={name}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FormField
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormField
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => onChange(e)}
                    />
                </FormGroup>
                {/*<MultiSelectComponent
                        dataSource={categoriesList} fields={{value: "_id", text: "name"}} placeholder="Select a category"
                        name="categories"
                        value={categories}
                        onChange={(e) => onChange(e)}
                        />*/}
                <Select isMulti={true} options={options} defaultInputValue={categories}
                        onChange={(e) => onChangeCategory(e)}/>
                <FormGroup>
                    <p>Image
                        <FormField
                            type="file"
                            name="image"
                            onChange={(e) => onChangeFile(e)}
                        />
                    </p>
                </FormGroup>
                <FormGroup>
                    <p>Optional Images (Up to 3)
                        <FormField
                            type="file"
                            name="image"
                            multiple
                            onChange={(e) => onChangeMultipleFiles(e)}
                        />
                    </p>
                </FormGroup>
                <FormButton>Update</FormButton>
            </Form>
        </Wrapper>
    );
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`;
const FormGroup = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  text-transform: uppercase;
  color: black;
  display: flex;
  flex-direction: column;
  width: 63%;
  align-self: center;
`;
const FormField = styled.input`
  color: black;
  padding: 15px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #ebebeb;

  ::placeholder {
    text-transform: uppercase;
    font-family: "Kiona";
    font-size: large;
    letter-spacing: 0.1rem;
  }
`;
const FormButton = styled.button`
  background: #7b1bf7;
  text-transform: uppercase;
  color: white;
  border-radius: 25px;
  padding: 15px;
  border: 0;
  font-size: large;
  margin: 10px 0;
  font: 200 larger Kiona;
`;
const FormError = styled.p`
  color: #f74b1b;
`;
const Spinner = () => (
    <Loader viewBox="0 0 50 50">
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="2"
        />
    </Loader>
);
const Loader = styled.svg`
  animation: rotate 2s linear infinite;
  display: flex;
  align-self: center;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default UpdateProduct;
