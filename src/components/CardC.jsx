import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/CardC.css";
import { Link } from "react-router-dom";

const CardC = ({ imagen, titulo, descripcion, precio, idProducto }) => {
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

            <div className="text-center">
              <Link
                className="btn btn-primary"
                to={`/detalle-producto/${idProducto}`}
              >
                Ver Mas
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardC;
