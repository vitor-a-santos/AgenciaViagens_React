import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViagemService from "../../services/ViagemService";

export default function Index() {
  const [viagens, setViagens] = useState([]);

  const getAllViagens = () => {
    ViagemService.getAllViagens()
      .then((response) => {
        setViagens(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllViagens();
  }, []);

  const deleteViagem = (viagemId_viagem) => {
    ViagemService.deleteViagem(viagemId_viagem)
      .then((response) => {
        getAllViagens();
      })
      .catch((error) => {
        console.log(error);
        const { data } = error.response;
        if (data.status === 500) {
          alert("Erro na API");
        }
      });
  };

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro de Viagem</h1>
      </header>
      <div className="container py-3">
        <Link to="/Viagens-Create" className="btn btn-primary mb-2">
          Criar 
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>DATA IDA </th>
                <th>DATA VOLTA</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {viagens.map((viagem) => (
                <tr key={viagem.id_viagem}>
                  <td>{viagem.id_viagem}</td>
                  <td>{viagem.dataIda}</td>
                  <td>{viagem.dataVolta}</td>
                  <td className="d-flex">
                    <Link
                      to={`/Editoras-Update/${viagem.id_viagem}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteViagem(viagem.id_viagem)}
                      style={{ marginLeft: "10px" }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}