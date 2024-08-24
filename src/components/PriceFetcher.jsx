// src/components/PriceFetcher.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceFetcher = ({ sumaTotal, priceBs, setPriceBs }) => {
  const [refreshPrice, setRefreshPrice] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data } = await axios.get("/api/prices");
        // const { data } = await axios.get("http://localhost:5000/api/prices");
        console.log(data.price);
        // Suponiendo que la respuesta es un objeto como { price: "43.8" }
        // Asegúrate de que data.price es un número y está bien formateado
        let precio = parseFloat(data.price);
        if (!isNaN(precio)) {
          let suma = precio + 1;
          setPriceBs(suma); // Actualiza el estado con el nuevo valor
        } else {
          console.error("Invalid price data:", data.price);
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();

    // Opcional: Actualiza el precio cada 10 segundos
    const interval = setInterval(() => {
      setRefreshPrice((prev) => !prev);
    }, 10000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [refreshPrice]);

  return <></>;
};

export default PriceFetcher;
