import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clientAxios from "../helpers/axios";

const FormC = ({ idPagina }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({});
  const [formLogin, setFormLogin] = useState({});
  const [errores, setErrores] = useState({});

  const handleChange = (ev) => {
    setFormRegister({ ...formRegister, [ev.target.name]: ev.target.value });
  };

  const handleChangeLogin = (ev) => {
    setFormLogin({ ...formLogin, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (!formRegister.usuario) {
      console.log("usuario");
      setErrores({ ...errores, usuario: true });
    }

    if (!formRegister.contrasenia) {
      console.log("contrasenia");
      setErrores({ ...errores, contrasenia: true });
    }

    if (!formRegister.rcontrasenia) {
      console.log("repetir");
      setErrores({ ...errores, rcontrasenia: true });
    }

    if (
      formRegister.usuario &&
      formRegister.contrasenia &&
      formRegister.rcontrasenia
    ) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuarioExiste = usuarios.find(
        (usuario) => usuario.nombreUsuario === formRegister.usuario
      );

      if (usuarioExiste) {
        return alert("usuario no disponible");
      }

      if (formRegister.contrasenia === formRegister.rcontrasenia) {
        const result = await clientAxios.post("/usuarios", {
          nombreUsuario: formRegister.usuario,
          contrasenia: formRegister.contrasenia,
        });

        if (result.status === 201) {
          Swal.fire({
            title: "Registro exitoso!",
            text: "Te hemos enviado un mail de bienvenida!",
            icon: "success",
          });

          setTimeout(() => {
            navigate("/iniciar-sesion");
          }, 1000);
        }
      } else {
        alert("Las contraseñas no son iguales");
      }
    }
  };

  const handleClickLogin = async (ev) => {
    ev.preventDefault();
    /*   if (!formLogin.usuario) {
      setErrores({ ...errores, usuario: true });
    }

    if (!formLogin.contrasenia) {
      setErrores({ ...errores, contrasenia: true });
    } */

    if (formLogin.usuario && formLogin.contrasenia) {
      const result = await clientAxios.post("/usuarios/iniciarSesion", {
        nombreUsuario: formLogin.usuario,
        contrasenia: formLogin.contrasenia,
      });

      if (result.status === 200) {
        Swal.fire({
          title: "Inicio Exitoso",
          text: "En breve seras redirigo a tu sesion",
          icon: "success",
        });

        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));

        if (result.data.rol === "usuario") {
          setTimeout(() => {
            navigate("/usuario-inicio");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/admin-inicio");
          }, 1000);
        }
      } else {
        Swal.fire({
          title: "Usuario bloqueado",
          text: "Ponte en contacto con el administrador del sitio",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="usuario"
            type="text"
            placeholder="Enter email"
            onChange={
              idPagina === "registro" ? handleChange : handleChangeLogin
            }
            className={
              errores.usuario ? "form-control is-invalid" : "form-control"
            }
          />
          {errores.usuario && (
            <p className="text-danger">Campo USUARIO vacio</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="contrasenia"
            type="password"
            placeholder="Password"
            onChange={
              idPagina === "registro" ? handleChange : handleChangeLogin
            }
            className={
              errores.contrasenia ? "form-control is-invalid" : "form-control"
            }
          />
          {errores.contrasenia && (
            <p className="text-danger">Campo CONTRASEÑA vacio</p>
          )}
        </Form.Group>

        {idPagina === "registro" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Repetir Contraseña</Form.Label>
            <Form.Control
              name="rcontrasenia"
              type="password"
              placeholder="Password"
              onChange={
                idPagina === "registro" ? handleChange : handleChangeLogin
              }
              className={
                errores.rcontrasenia
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            {errores.rcontrasenia && (
              <p className="text-danger">Campo REPETIR CONTRASEÑA vacio</p>
            )}
          </Form.Group>
        )}

        <Button
          variant="primary"
          type="submit"
          onClick={idPagina === "registro" ? handleClick : handleClickLogin}
        >
          {idPagina === "registro" ? " Enviar Datos" : "Ingresar"}
        </Button>
      </Form>
    </>
  );
};

export default FormC;
