import { useEffect } from "react";
import axiosInstance from "./api/axios";

function App() {
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <h1>App</h1>;
}

export default App;