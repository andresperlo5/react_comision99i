import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clientAxios, { configHeader, configHeaderImg } from "../helpers/axios";

const TableC = ({ arrayUsuarios, idPagina }) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario"));
  const [usuarioMapeado, setUsuarioMapeado] = useState({});
  const [productoMapeado, setProductoMapeado] = useState({});
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleUser = (usuario) => {
    setShow(true);
    setUsuarioMapeado(usuario);
  };

  const handleChange = (ev) => {
    setUsuarioMapeado({ ...usuarioMapeado, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    if (usuarioMapeado.rol !== "usuario" && usuarioMapeado.rol !== "admin") {
      return alert("Role invalido. Solo se puede ser USUARIO o ADMIN");
    }
    const usuarioActualizado = await clientAxios.put(
      `/usuarios/${usuarioMapeado._id}`,
      usuarioMapeado,
      configHeader
    );

    if (usuarioActualizado.status === 200) {
      alert("Usuario actualizado");
    }

    handleClose();
  };

  const handleDeleteUser = async (idUser) => {
    const confirmarBorradoDelUsuario = confirm(
      "¿Estas seguro de que quieres eliminar a este usuario?"
    );

    if (confirmarBorradoDelUsuario) {
      const result = await clientAxios.delete(
        `/usuarios/${idUser}`,
        configHeader
      );

      if (result.status === 200) {
        Swal.fire({
          title: "Usuario borrado correctamente!",
          icon: "success",
        });
      }
    }
  };

  const handleDisabledUser = async (usuario) => {
    const confirmarBloqueoUsuario = confirm(
      "¿Estas seguro de que quieres bloquear a este usuario?"
    );

    if (confirmarBloqueoUsuario) {
      const result = await clientAxios.put(
        `/usuarios/bloquear/${usuario._id}`,
        {},
        configHeader
      );

      if (result.status === 200) {
        Swal.fire({
          title: "Usuario bloqueado correctamente!",
          icon: "success",
        });
      }
    }
  };

  const handleEnabledUser = async (usuario) => {
    const confirmarBloqueoUsuario = confirm(
      "¿Estas seguro de que quieres activar a este usuario?"
    );

    if (confirmarBloqueoUsuario) {
      const result = await clientAxios.put(
        `/usuarios/habilitar/${usuario._id}`,
        {},
        configHeader
      );

      if (result.status === 200) {
        Swal.fire({
          title: "Usuario habilitado correctamente!",
          icon: "success",
        });
      }
    }
  };

  const handleProduct = (producto) => {
    setShow(true);
    setProductoMapeado(producto);
  };

  const handleChangeProduct = (ev) => {
    setProductoMapeado({
      ...productoMapeado,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleClickProduct = async (ev) => {
    try {
      ev.preventDefault();
      console.log(productoMapeado);
      const { nombre, precio, descripcion } = productoMapeado;
      if (!nombre || !precio || !descripcion) {
        return alert("algun campo esta vacio.");
      }

      if (nombre && precio && descripcion) {
        const result = await clientAxios.put(
          `/productos/${productoMapeado._id}`,
          productoMapeado,
          configHeader
        );

        if (result.status === 200) {
          if (image) {
            const formData = new FormData();
            formData.append("image", image);
            const result = await clientAxios.post(
              `/productos/agregarImg/${productoMapeado._id}`,
              formData,
              configHeaderImg
            );

            if (result.status === 200) {
              Swal.fire({
                title: "Producto actualizado correctamente!",
                icon: "success",
              });
              return;
            }
          }
          Swal.fire({
            title: "Producto actualizado correctamente!",
            icon: "success",
          });
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.msg}`,
        });
      }
    }
  };

  const handleDeleteProduct = async (idProducto) => {
    Swal.fire({
      title: "Estas seguro que quieres eliminar a este producto?",
      text: "Si lo borras no podras recuperar el dato!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy de acuerdo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await clientAxios.delete(
          `/productos/${idProducto}`,
          configHeader
        );

        if (res.status === 200) {
          Swal.fire({
            title: "Producto borrado!",
            text: "El producto se borro de forma exitosa",
            icon: "success",
          });
        }
      }
    });
  };

  const handleDisabledProduct = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres deshabilitar a este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy de acuerdo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await clientAxios.put(
          `/productos/disabled/${idProducto}`,
          {},
          configHeader
        );

        if (res.status === 200) {
          Swal.fire({
            title: "Producto bloqueado!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleEnabledProduct = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres habilitar a este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy de acuerdo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await clientAxios.put(
          `/productos/enabled/${idProducto}`,
          {},
          configHeader
        );

        if (res.status === 200) {
          Swal.fire({
            title: "Producto activo!",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          {idPagina === "admin-products" ? (
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Imagen</th>
            </tr>
          ) : (
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Role</th>
              <th>Opciones</th>
            </tr>
          )}
        </thead>
        {idPagina === "admin-products" ? (
          <tbody>
            {arrayUsuarios?.map((producto) => (
              <tr key={producto._id}>
                <td>{producto._id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <img src={producto.imagen} alt="" width={50} />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleProduct(producto)}
                  >
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            value={productoMapeado.nombre}
                            onChange={handleChangeProduct}
                            name="nombre"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="text"
                            value={productoMapeado.precio}
                            name="precio"
                            onChange={handleChangeProduct}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Descripcion</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={productoMapeado.descripcion}
                            name="descripcion"
                            onChange={handleChangeProduct}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(ev) => setImage(ev.target.files[0])}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClickProduct}
                        >
                          Guardar Cambios
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>

                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(producto._id)}
                  >
                    Eliminar
                  </Button>

                  <Button
                    variant={producto.bloqueado ? "success" : "warning"}
                    onClick={() =>
                      producto.bloqueado
                        ? handleEnabledProduct(producto._id)
                        : handleDisabledProduct(producto._id)
                    }
                  >
                    {producto.bloqueado ? "Habilitar" : "Deshabilitar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {arrayUsuarios?.map(
              (usuario) =>
                usuario.rol !== "admin" && (
                  <tr key={usuario._id}>
                    <td>{usuario._id}</td>
                    <td>{usuario.nombreUsuario}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleUser(usuario)}
                      >
                        Editar
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Usuario</Form.Label>
                              <Form.Control
                                type="text"
                                value={usuarioMapeado.nombreUsuario}
                                onChange={handleChange}
                                name="nombreUsuario"
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label>Role</Form.Label>
                              <Form.Control
                                type="text"
                                value={usuarioMapeado.rol}
                                name="rol"
                                onChange={handleChange}
                              />
                            </Form.Group>

                            <Button
                              variant="primary"
                              type="submit"
                              onClick={handleClick}
                            >
                              Guardar Cambios
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>

                      {usuario?._id !== usuarioLogueado?._id && (
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUser(usuario._id)}
                        >
                          Eliminar
                        </Button>
                      )}

                      {usuario?._id !== usuarioLogueado?._id && (
                        <Button
                          variant={usuario.bloqueado ? "success" : "warning"}
                          onClick={() =>
                            usuario.bloqueado
                              ? handleEnabledUser(usuario)
                              : handleDisabledUser(usuario)
                          }
                        >
                          {usuario.bloqueado ? "Habilitar" : "Deshabilitar"}
                        </Button>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default TableC;
