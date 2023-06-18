import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import HomeView from "./pages/HomeView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/movie-list" element={<ListView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
