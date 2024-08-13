import { Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import clientAxios from "../helpers/axios";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarioLocalStorage = async () => {
    const usuariosDb = await clientAxios.get("/usuarios");
    setUsuarios(usuariosDb.data);
  };

  useEffect(() => {
    obtenerUsuarioLocalStorage();
  }, []);
  return (
    <>
      <h2 className="text-center my-5">Nuestros Usuarios</h2>
      <Container>
        <TableC arrayUsuarios={usuarios} />
      </Container>
    </>
  );
};

export default AdminUsersPage;
