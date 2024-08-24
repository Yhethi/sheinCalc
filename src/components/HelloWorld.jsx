import React, { useState, useEffect } from "react";

function HelloWorld() {
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/prices") // Utiliza una ruta relativa en lugar de localhost
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Cambia de response.text() a response.json()
      })
      .then((data) => {
        setPrice(data.price || "Price not available");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  }, []);

  return (
    <div>
      <h1>{error || price}</h1>
    </div>
  );
}

export default HelloWorld;
