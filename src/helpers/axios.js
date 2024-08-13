import axios from "axios";
const token = JSON.parse(sessionStorage.getItem("token")) || "";
console.log(token);
const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_DEPLOY}/api`,
});

export const configHeader = {
  headers: {
    "content-type": "application/json",
    auth: `${token}`,
  },
};

export const configHeaderImg = {
  headers: {
    "content-type": "multipart/form-data",
    auth: `${token}`,
  },
};

export default clientAxios;
