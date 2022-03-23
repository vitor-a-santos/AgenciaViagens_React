import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinoService from "../../services/DestinoService";
import ViagemService from "../../services/ViagemService";
import PaxService from "../../services/PaxService";

export default function Create() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [destino, setDestino] = useState({ id_destino: "", cidade: "", estado: "", preco: ""});
  const [viagem, setViagem] = useState({ id: "", dataIda: "", dataVolta: "" });
  const [destinos, setDestinos] = useState([]);
  const [viagens, setViagens] = useState([]);
  const { id_pax } = useParams();
  const navigate = useNavigate();

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

  const getAllDestinos = () => {
    DestinoService.getAllDestinos()
      .then((response) => {
        setDestinos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllDestinos();
  }, []);

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const pax = { nome, idade, cpf, pagamento, destino, viagem };
    console.log(pax)
    if (id_pax) {
      PaxService.updatePax(id_pax, pax).then((response) => {
        navigate("/Paxs");
      });
    } else {
      PaxService.createPax(pax).then((response) => {
        navigate("/Paxs");
      });
    }
  };

  useEffect(() => {
    function getPaxById_pax() {
      if (id_pax) {
        PaxService.getPaxById_pax(id_pax)
          .then((response) => {
            setNome(response.data.nome);
            setIdade(response.data.idade);
            setCpf(response.data.cpf);
            setPagamento(response.data.pagamento);
            setDestino({
              id_destino: response.data.destino.id_destino,
              cidade: response.data.destino.cidade,
              estado: response.data.destino.estado,
              preco: response.data.destino.preco,
            });
            setViagem({
              id_viagem: response.data.viagem.id_viagem,
              dataIda: response.data.viagem.dataIda,
              dataVolta: response.data.viagem.dataVolta,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getPaxById_pax();
  }, [id_pax]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id_pax ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="form-group mb-3">
            <label htmlFor="Nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="Nome"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Idade" className="form-label">
              Idade
            </label>
            <input
              type="text"
              id="Idade"
              className="form-control"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Cpf" className="form-label">
              CPF
            </label>
            <input
              type="text"
              id="Cpf"
              className="form-control"
              placeholder="Cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Pagamento" className="form-label">
              Pagamneto
            </label>
            <input
              type="text"
              id="pagamento"
              className="form-control"
              placeholder="pagamento"
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="DestinoId_destino" className="form-label">
              Destino
            </label>
            <select
              id="DestinoId_autor"
              name="DestinoId_autor"
              className="form-select"
              onChange={(e) =>
                setDestino({ id_destino: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{destino.id_destino ? destino.cidade : 'Escolha um destino'}</option>
              {destinos.map((destino) => (
                <option key={destino.id_destino} value={destino.id_destino}>
                  {destino.cidade} {destino.estado} {destino.preco}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Viagem" className="form-label">
              Viagem
            </label>
            <select
              id="Viagem"
              name="Viagem"
              className="form-select"
              onChange={(e) =>
                setViagem({ id: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{viagem.id_viagem ? viagem.dataIda : 'Escolha uma data de Viagem'}</option>
              {viagens.map((viagem) => (
                <option key={viagem.id_viagem} value={viagem.id_viagem}>
                  {viagem.dataIda} {viagem.dataVolta}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarDestino(e)}
          >
            Enviar
          </button>
          <Link
            to="/Paxs"
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