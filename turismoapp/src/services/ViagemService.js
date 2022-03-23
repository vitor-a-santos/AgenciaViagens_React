import axios from "axios";

const VIAGEM_API_URL = 'http://localhost:8080/viagens';

class ViagemService {
  getAllViagens() {
    return axios.get(VIAGEM_API_URL);
  }

  createViagem(viagem) {
    return axios.post(VIAGEM_API_URL, viagem);
  }

  getViagemById_viagem(viagemId_viagem) {
    return axios.get(VIAGEM_API_URL + "/" + viagemId_viagem);
  }

  updateViagem(viagemId_viagem, viagem) {
    return axios.put(VIAGEM_API_URL + "/" + viagemId_viagem, viagem);
  }

  deleteViagem(viagemId_viagem) {
    return axios.delete(VIAGEM_API_URL + "/" + viagemId_viagem);
  }
}

export default new ViagemService();