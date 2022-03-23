import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaxService from "../../services/PaxService";

export default function Index() {
  const [paxs, setPaxs] = useState([]);

  const getAllPaxs = () => {
    PaxService.getAllPaxs()
      .then((response) => {
        setPaxs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPaxs();
  }, []);

  const deletePax = (paxId_pax) => {
    PaxService.deletePax(paxId_pax)
      .then((response) => {
        getAllPaxs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro de Passageiros (PAX) </h1>
      </header>
      <div className="container py-3">
        <Link to="/Paxs-Create" className="btn btn-primary mb-2">
          Criar Pax
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>CPF</th>
                <th>Forma de Pagamento</th>
                <th>Destino</th>
                <th>Data Viagem </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paxs.map((pax) => (
                <tr key={pax.id_pax}>
                  <td>{pax.id_pax}</td>
                  <td>{pax.nome}</td>
                  <td>{pax.idade}</td>
                  <td>{pax.cpf}</td>
                  <td>{pax.pagamento}</td>
                  <td>
                    {pax.destino.cidade} {pax.destino.estado} {pax.destino.preco} 
                  </td>
                  <td>{pax.viagem.dataIda} {pax.viagem.dataVolta}  </td>
                  <td className="d-flex">
                    <Link
                      to={`/Paxs-Update/${pax.id_pax}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePax(pax.id_pax)}
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