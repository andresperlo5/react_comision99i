import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || null;
  if (!token) {
    setTimeout(() => {
      navigate("/");
    }, 100);
  } else if (rol === rolUsuario || rolUsuario === "admin") {
    return children;
  } else {
    if (rolUsuario === "usuario") {
      setTimeout(() => {
        navigate("/usuario-inicio");
      }, 100);
      return children;
    }
  }
};

export default PrivateRoute;
