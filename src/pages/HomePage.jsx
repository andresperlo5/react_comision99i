import { useEffect, useState } from "react";
import { useApi } from "../helpers/api";
import CardC from "../components/CardC";
import { Container, Row } from "react-bootstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await useApi();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <h3 className="text-center my-5">Nuestros Productos</h3>
        <Row>
          {products.map((product) => (
            <CardC
              key={product.id}
              imagen={product.image}
              titutlo={product.title}
              descripcion={product.description}
              precio={product.price}
              idProducto={product.id}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
