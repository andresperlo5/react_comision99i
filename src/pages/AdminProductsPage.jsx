import { useEffect, useState } from "react";
import TableC from "../components/TableC";
import { Container } from "react-bootstrap";
import clientAxios from "../helpers/axios";

const AdminProductsPage = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    const productosAPI = await clientAxios.get("/productos");
    setProductos(productosAPI.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <>
      <h2 className="text-center my-5">Nuestros Productos</h2>
      <Container>
        <TableC arrayUsuarios={productos} idPagina="admin-products" />
      </Container>
    </>
  );
};

export default AdminProductsPage;
