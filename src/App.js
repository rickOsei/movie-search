import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        autoClose={3000}
        toastClassName="alert"
        closeButton={false}
      />
    </>
  );
}

export default App;
