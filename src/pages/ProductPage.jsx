import { useParams } from "react-router-dom";
import { useApi } from "../helpers/api";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  const getOneProduct = async () => {
    const product = await useApi(params.id);
    setProduct(product);
  };

  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    <>
      <img src={product?.image} alt="" />
      <h3>{product?.title}</h3>
      <p>${product?.price}</p>
      <p>{product?.description}</p>
      <button>Añadir a Favoritos</button>
      <button>Añadir al Carrito</button>
    </>
  );
};

export default ProductPage;
