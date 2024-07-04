import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import UserFavPage from "../pages/UserFavPage";
import UserCartPage from "../pages/UserCartPage";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/AdminPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import ErrorPage from "../pages/ErrorPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/admin-productos" element={<AdminProductsPage />} />
        <Route path="/admin-usuarios" element={<AdminUsersPage />} />
        <Route path="/admin-inicio" element={<AdminPage />} />
        <Route path="/detalle-producto/:id" element={<ProductPage />} />
        <Route path="/usuario-favoritos" element={<UserFavPage />} />
        <Route path="/usuario-carrito" element={<UserCartPage />} />
        <Route path="/usuario-inicio" element={<UserPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
