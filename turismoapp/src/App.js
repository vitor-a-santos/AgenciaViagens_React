import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Destinos from "./views/Destinos";
import DestinosCreate from "./views/Destinos/Create";
import Viagens from "./views/Viagens";
import ViagensCreate from "./views/Viagens/Create";
import Paxs from "./views/Paxs";
import PaxsCreate from "./views/Paxs/Create";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import "./estilo.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Destinos" element={<Destinos />} />
          <Route path="/Destinos-Create" element={<DestinosCreate />} />
          <Route path="/Destinos-Update/:id" element={<DestinosCreate />} />
          <Route path="/Viagens" element={<Viagens />} />
          <Route path="/Viagens-Create" element={<ViagensCreate />} />
          <Route path="/Viagens-Update/:id" element={<ViagensCreate />} />
          <Route path="/Paxs" element={<Paxs />} />
          <Route path="/Paxs-Create" element={<PaxsCreate />} />
          <Route path="/Paxs-Update/:id" element={<PaxsCreate />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;