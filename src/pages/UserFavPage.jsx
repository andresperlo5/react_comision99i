import { useEffect, useState } from "react";
import CardC from "../components/CardC";
import { Container } from "react-bootstrap";
import clientAxios, { configHeader } from "../helpers/axios";

const UserFavPage = () => {
  const [productos, setProductos] = useState([]);

  const obtenerFavoritosUsuario = async () => {
    const products = await clientAxios.get("/favoritos", configHeader);
    setProductos(products.data.productos);
  };

  useEffect(() => {
    obtenerFavoritosUsuario();
  }, []);
  return (
    <>
      <Container className="my-5 d-flex justify-content-evenly">
        {productos.map((producto) => (
          <CardC
            key={producto._id}
            imagen={producto.imagen}
            titulo={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            idProducto={producto._id}
            idPagina={"fav"}
          />
        ))}
      </Container>
    </>
  );
};

export default UserFavPage;
