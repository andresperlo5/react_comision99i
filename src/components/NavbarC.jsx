import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarC = () => {
  const navigate = useNavigate();
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario")) || null;

  const handleLogout = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const posicionUsuario = usuarios.findIndex(
      (usuario) => usuario.id === usuarioLogeado.id
    );

    usuarios[posicionUsuario].login = false;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sessionStorage.removeItem("usuario");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="nav-link">
            Logo
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
              <NavLink to="/sobre-nosotros" className="nav-link">
                Sobre Nosotros
              </NavLink>
              <NavLink to="/contacto" className="nav-link">
                Contacto
              </NavLink>
              {usuarioLogeado && (
                <>
                  <NavLink to="/sobre-nosotros" className="nav-link">
                    Favoritos
                  </NavLink>
                  <NavLink to="/contacto" className="nav-link">
                    Carrito
                  </NavLink>
                </>
              )}
            </Nav>

            <Nav className="ms-auto">
              {usuarioLogeado ? (
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
