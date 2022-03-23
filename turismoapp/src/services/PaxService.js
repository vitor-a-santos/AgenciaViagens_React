import axios from "axios";

const PAX_API_URL = 'http://localhost:8080/paxs';

class PaxService {
  getAllPaxs() {
    return axios.get(PAX_API_URL);
  }

  createPax(pax) {
    return axios.post(PAX_API_URL, pax);
  }

  getPaxById_pax(paxId_pax) {
    return axios.get(PAX_API_URL + "/" + paxId_pax);
  }

  updatePax(paxId_pax, pax) {
    return axios.put(PAX_API_URL + "/" + paxId_pax, pax);
  }

  deletePax(paxId_pax) {
    return axios.delete(PAX_API_URL + "/" + paxId_pax);
  }
}

export default new PaxService();