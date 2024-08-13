import { useEffect, useState } from "react";
import CardC from "../components/CardC";
import { Container, Row } from "react-bootstrap";
import clientAxios from "../helpers/axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productos = await clientAxios.get("/productos");
    setProducts(productos.data);
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
              key={product._id}
              imagen={product.imagen}
              titulo={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              idProducto={product._id}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
