import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinoService from "../../services/DestinoService";

export default function Create() {
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [preco, setPreco] = useState("");
  const { id_destino } = useParams();
  const navigate = useNavigate();

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const destino = { cidade, estado, preco};

    if (id_destino) {
        DestinoService.updateDestino(id_destino, destino)
        .then((response) => {
            navigate("/Destinos")
        })

    } else {
        DestinoService.createDestino(destino)
        .then((response) => {
            navigate("/Destinos")
        })
    }
  }

  useEffect(() => {
      function getDestinoById_destino() {
        if (id_destino) {
            DestinoService.getDestinoById_destino(id_destino)
            .then((response) => {
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setPreco(response.data.preco);
            })
            .catch((error) => {
                console.log(error);
            })
        }
      }
      getDestinoById_destino()
  }, [id_destino]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id_destino ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="mb-3">
            <label htmlFor="Cidade" className="form-label">
              Cidade
            </label>
            <input
              type="text"
              id="Cidade"
              className="form-control"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Estado" className="form-label">
              Estado
            </label>
            <input
              type="text"
              id="Estado"
              className="form-control"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Preco" className="form-label">
              Preço estimado
            </label>
            <input
              type="text"
              id="Preco"
              className="form-control"
              placeholder="Preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>

          

          <button type="submit" className="btn btn-primary" onClick={(e) => criarOuEditarDestino(e)}>
            Enviar
          </button>
          <Link
            to="/Destinos"
            className="btn btn-danger"
            style={{ marginLeft: "8px" }}
          >
            Cancelar
          </Link>
        </fieldset>
      </form>
    </div>
  );
}