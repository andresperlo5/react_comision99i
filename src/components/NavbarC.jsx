import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  const rol = JSON.parse(sessionStorage.getItem("rol")) || null;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink
            to={
              token && rol === "admin"
                ? "/admin-inicio"
                : token && rol === "usuario"
                ? "/usuario-inicio"
                : "/"
            }
            className="nav-link"
          >
            Logo
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={
                  token && rol === "admin"
                    ? "/admin-inicio"
                    : token && rol === "usuario"
                    ? "/usuario-inicio"
                    : "/"
                }
                className="nav-link"
              >
                Inicio
              </NavLink>
              {(token && rol === "usuario") ||
                (!token && (
                  <>
                    <NavLink to="/sobre-nosotros" className="nav-link">
                      Sobre Nosotros
                    </NavLink>
                    <NavLink to="/contacto" className="nav-link">
                      Contacto
                    </NavLink>
                  </>
                ))}
              {token && rol === "admin" && (
                <>
                  <NavLink to="/admin-usuarios" className="nav-link">
                    Panel de Usuarios
                  </NavLink>
                  <NavLink to="/admin-productos" className="nav-link">
                    Panel de Productos
                  </NavLink>{" "}
                  <NavLink to="/" className="nav-link">
                    Ir a vista Usuario
                  </NavLink>
                </>
              )}
              {token && rol === "usuario" && (
                <>
                  <NavLink to="/usuario-favoritos" className="nav-link">
                    Favoritos
                  </NavLink>
                  <NavLink to="/usuario-carrito" className="nav-link">
                    Carrito
                  </NavLink>
                </>
              )}
            </Nav>

            <Nav className="ms-auto">
              {token ? (
                <NavLink to="#" className="nav-link" onClick={handleLogout}>
                  Cerrar Sesion
                </NavLink>
              ) : (
                <>
                  <NavLink to="/iniciar-sesion" className="nav-link">
                    Iniciar Sesion
                  </NavLink>
                  <NavLink to="/registrarse" className="nav-link">
                    Registrarse
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
