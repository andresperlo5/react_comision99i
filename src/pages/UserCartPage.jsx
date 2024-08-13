import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import clientAxios, { configHeader } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const UserCartPage = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [idMercadoPago, setIdMercadoPago] = useState(null);

  const obtenerFavoritosUsuario = async () => {
    const products = await clientAxios.get("/carritos", configHeader);
    setProductos(products.data.productos);
  };

  const handleDeleteProductCart = async (idProducto) => {
    const token = JSON.parse(sessionStorage.getItem("token")) || "";

    Swal.fire({
      title:
        "Estas seguro de que quieres eliminar a este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, Estoy de acuerdo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const products = await clientAxios.delete(
          `/carritos/${idProducto}`,
          configHeader
        );

        if (products.status === 200) {
          Swal.fire({
            title: "Eliminado!",
            text: "El producto se borro con exito del carrito",
            icon: "success",
          });
        }
      }
    });
  };

  /*   const handleChangePayMp = async () => {
    const result = await clientAxios.post(`/productos/pagar`, {}, configHeader);

    if (result.status === 200) {
      setTimeout(() => {
        location.href = `${result.data.url}`;
      }, 100);
    }
  };
 */

  const handleChangePayMp = async () => {
    initMercadoPago(`${import.meta.env.VITE_API_KEY_MP}`);
    const result = await clientAxios.post(`/productos/pagar`, {}, configHeader);

    if (result.status === 200) {
      setIdMercadoPago(result.data.url);
    }
  };

  useEffect(() => {
    obtenerFavoritosUsuario();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto._id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <p>$total</p>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProductCart(producto._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleChangePayMp}>Pagar</Button>

        <Wallet
          initialization={{
            preferenceId: idMercadoPago,
            redirectMode: "modal",
          }}
        />
      </Container>
    </>
  );
};

export default UserCartPage;
