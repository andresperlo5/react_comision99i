import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import clientAxios, { configHeader } from "../helpers/axios";

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);

  const getOneProduct = async () => {
    const products = await clientAxios.get(`/productos/${params.id}`);
    setProduct(products.data);
  };

  const handleAddProductFav = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")) || "";
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERR: Tenes que iniciar sesion.!",
        });

        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 1000);

        return;
      }

      const products = await clientAxios.post(
        `/productos/addProductFav/${params.id}`,
        {},
        configHeader
      );

      if (products.status === 200) {
        Swal.fire({
          title: "Producto agregado a Favoritos!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `ERR: ${error.response.data.msg}!`,
      });
    }
  };

  const handleAddProductCart = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")) || "";
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERR: Tenes que iniciar sesion.!",
        });

        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 1000);

        return;
      }
      const products = await clientAxios.post(
        `/productos/addProductCart/${params.id}`,
        {},
        configHeader
      );

      if (products.status === 200) {
        Swal.fire({
          title: "Producto agregado al Carrito!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `ERR: ${error.response.data.msg}!`,
      });
    }
  };

  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    <>
      <div className="text-center my-5">
        <img src={product?.imagen} alt="" width={300} />
        <h3>{product?.nombre}</h3>
        <p>${product?.precio}</p>
        <p>{product?.descripcion}</p>
        <button className="btn btn-primary me-3" onClick={handleAddProductFav}>
          Añadir a Favoritos
        </button>
        <button className="btn btn-warning" onClick={handleAddProductCart}>
          Añadir al Carrito
        </button>
      </div>
    </>
  );
};

export default ProductPage;
