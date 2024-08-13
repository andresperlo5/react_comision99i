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
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route
          path="/admin-productos"
          element={
            <PrivateRoute rol={"admin"}>
              <AdminProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-usuarios"
          element={
            <PrivateRoute rol={"admin"}>
              <AdminUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-inicio"
          element={
            <PrivateRoute rol={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario-favoritos"
          element={
            <PrivateRoute rol={"usuario"}>
              <UserFavPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario-carrito"
          element={
            <PrivateRoute rol={"usuario"}>
              <UserCartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario-inicio"
          element={
            <PrivateRoute rol={"usuario"}>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route path="/detalle-producto/:id" element={<ProductPage />} />
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
