export const useApi = async (id) => {
  try {
    const res = await fetch(
      `${
        id
          ? `https://fakestoreapi.com/products/${id}`
          : "https://fakestoreapi.com/products/"
      }`
    );
    const productos = await res.json();
    return productos;
  } catch (error) {
    return error;
  }
};
