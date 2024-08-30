import { Route, Routes } from "react-router-dom";

// styles
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/button.css";
import "./styles/modal.css";
import "./styles/customes.css";

// components
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Modal from "./components/Modal";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tv-show" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>

      <Modal />
    </>
  )
}

export default App

