import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../css/CardC.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clientAxios, { configHeader } from "../helpers/axios";

const CardC = ({
  imagen,
  titulo,
  descripcion,
  precio,
  idProducto,
  idPagina,
}) => {
  const handleDeleteProductFav = async () => {
    const token = JSON.parse(sessionStorage.getItem("token")) || "";

    Swal.fire({
      title:
        "Estas seguro de que quieres eliminar a este producto de Favoritos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, Estoy de acuerdo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const products = await clientAxios.delete(
          `/favoritos/${idProducto}`,
          configHeader
        );

        if (products.status === 200) {
          Swal.fire({
            title: "Eliminado!",
            text: "El producto se borro con exito de Favoritos",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <Col sm="12" md="6" lg="4" className="my-3">
        <Card>
          <div className="imagen-producto">
            <Card.Img variant="top" src={imagen} />
          </div>
          <Card.Body>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>${precio}</Card.Text>
            <Card.Text className=" text-truncate">{descripcion}</Card.Text>

            <div
              className={
                idPagina === "fav"
                  ? "d-flex justify-content-around"
                  : "text-center"
              }
            >
              <Link
                className="btn btn-primary"
                to={`/detalle-producto/${idProducto}`}
              >
                Ver Mas
              </Link>
              {idPagina === "fav" && (
                <Link
                  className="btn btn-danger"
                  to={"#"}
                  onClick={handleDeleteProductFav}
                >
                  Eliminar
                </Link>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardC;
