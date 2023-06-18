import { useEffect, useState } from "react";
import HomeView from "./pages/HomeView";
import Router from "./Router";
import axios from "axios";
import { getPokemonData } from "./Features/listSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonData());
  }, []);

  return <Router />;
}

export default App;
