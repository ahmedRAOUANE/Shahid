import { Route, Routes } from "react-router-dom";

// styles
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/button.css";
import "./styles/modal.css";
import "./styles/customes.css";

// components
import Header from "./components/Header";
import Modal from "./components/Modal";
import Details from "./pages/Details";
import WatchList from "./pages/WatchList";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import Featured from "./pages/featured";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/watch-list" element={<WatchList />} />
      </Routes>

      <Modal />
    </>
  )
}

export default App

