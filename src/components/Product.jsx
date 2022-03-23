import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 350px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;
const Image = styled.img`
  height: 20%;
  width: 20%;
`;

const Product = ({ item }) => {
    return (
        <Container>
            <a key={item._id} href={`/product/${item._id}`} className="group">
                    <Image
                        src={'http://localhost:8080/files/' + item.image}
                        alt="Image"
                    />
                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-2 text-lg font-medium text-gray-900">{item.description}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{item.price} DT</p>

            </a>
        </Container>
    );
};

export default Product;
