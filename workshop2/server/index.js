const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Variables globales para almacenar el valor del dólar y el euro
let dolarValue; 
let eurValue;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Endpoint para obtener la lista de países
app.get('/paises', (req, res) => {
  // Lista de países con su nombre y código de moneda
  const paises = [
    { name: "Costa Rica", currency: "crc" },
    { name: "Estados Unidos", currency: "usd"},
    { name: "Nicaragua", currency: "nio" },
    { name: "Mexico", currency: "mxn" },
    { name: "Panama", currency: "pab" },
    { name: "Colombia", currency: "cop" },
    { name: "España", currency: "eur"},
    { name: "Argentina", currency: "ars" },
    { name: "Brasil", currency: "brl" },
    { name: "Chile", currency: "clp" },
    { name: "Perú", currency: "pen" },
    { name: "Australia", currency: "aud" },
    { name: "Japón", currency: "jpy" },
    { name: "Reino Unido", currency: "gbp" },
    { name: "Canadá", currency: "cad" }
  ];
  // Responde con la lista de países en formato JSON
  res.json(paises);
});

// Ruta para manejar las solicitudes POST en /paises
app.post('/paises', async (req, res) => {
  // Obtiene la moneda seleccionada del cuerpo de la solicitud
  const currency = req.body.selection;
  console.log("Moneda seleccionada:", currency);
  try {
    // Realiza una solicitud para obtener los valores de la moneda seleccionada
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
    const responseData = await response.json();
    // Almacena los valores de dólar y euro
    dolarValue = responseData[currency].usd;
    eurValue = responseData[currency].eur;
    console.log("Dólar: ", dolarValue, " Euro: ", eurValue);
    // Envía una respuesta al cliente
    res.send('Datos recibidos en el servidor.');

    // Inicia la ruta GET /result después de procesar POST /paises
    resResultCurrency();
    
  } catch (error) {
    console.error("Error en la solicitud GET /paises:", error);
    res.status(500).send('Error en el servidor.');
  }
});

// Función para manejar la ejecución de la ruta GET /result
const resResultCurrency = () => {
  app.get('/result', (req, res) => {
    console.log("Valor del dólar: ", dolarValue)
    // Responde con los valores de dólar y euro en formato JSON
    const request = {
      dolarValue: dolarValue,
      eurValue: eurValue,
    }
    res.json(request);
  });
};

// Inicia el servidor en el puerto 3001
app.listen(3001, () => console.log(`Servidor iniciado!`));
