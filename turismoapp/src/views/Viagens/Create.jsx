import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViagemService from "../../services/ViagemService";

export default function Create() {
  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");
  const { id_viagem } = useParams();
  const navigate = useNavigate();

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const viagem = { dataIda, dataVolta };

    if (id_viagem) {
      ViagemService.updateViagem(id_viagem, viagem).then((response) => {
        navigate("/Viagens");
      });
    } else {
      ViagemService.createViagem(viagem).then((response) => {
        navigate("/Viagens");
      });
    }
  };

  useEffect(() => {
    function getViagemById_viagem() {
      if (id_viagem) {
        ViagemService.getViagemById_viagem(id_viagem)
          .then((response) => {
            setDataIda(response.data.dataIda);
            setDataVolta(response.data.dataVolta);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getViagemById_viagem();
  }, [id_viagem]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id_viagem ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="mb-3">
            <label htmlFor="DataIda" className="form-label">
              DataIda
            </label>
            <input
              type="text"
              id="dataIda"
              className="form-control"
              placeholder="dataIda"
              value={dataIda}
              onChange={(e) => setDataIda(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="DataVolta" className="form-label">
              Data Volta
            </label>
            <input
              type="text"
              id="DataVolta"
              className="form-control"
              placeholder="dataVolta"
              value={dataVolta}
              onChange={(e) => setDataVolta(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarDestino(e)}
          >
            Enviar
          </button>
          <Link
            to="/Viagens"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </Link>
        </fieldset>
      </form>
    </div>
  );
}