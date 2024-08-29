import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ethereum from "./pages/Ethereum";
import Solana from "./pages/Solana";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TopBar from "./pages/TopBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/ethereum" element={<Ethereum />} />
          <Route path="/solana" element={<Solana />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
