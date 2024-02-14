// Carga la lista de países al cargar la página
const ajaxRequestCountries = new XMLHttpRequest();
ajaxRequestCountries.addEventListener("load", (e) => {
  // Parsea la respuesta JSON para obtener la lista de países
  const countries = JSON.parse(e.target.responseText);
  let optionsHtml = "";
  // Construye las opciones del combo box con los países
  countries.forEach(country => {
    optionsHtml += `<option value="${country.currency}">${country.name}</option>`;
  });
  // Inserta las opciones en el combo box
  document.getElementById("countries").innerHTML = optionsHtml;
});
// Realiza una solicitud GET al servidor para obtener la lista de países
ajaxRequestCountries.open("GET", "http://localhost:3001/paises");
ajaxRequestCountries.send();

// Envía la moneda seleccionada al servidor
async function sendCurrency() {
  // Obtiene la moneda seleccionada del combo box
  const comboBox = document.getElementById("countries");
  const selection = comboBox.options[comboBox.selectedIndex].value;

  try {
    // Realiza una solicitud POST al servidor con la moneda seleccionada
    const response = await fetch("http://localhost:3001/paises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selection }),
    });

    // Verifica si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Procesa la respuesta del servidor
    const responseData = await response.json();
    console.log("Datos de respuesta:", responseData);
  } catch (error) {
    // Maneja errores de solicitud
    console.error("Error al enviar la moneda:", error);
    // Puedes mostrar un mensaje de error al usuario aquí
  }
  
  // Obtiene los valores de las monedas
  getCurrencyValue();
}

// Obtiene los valores de las monedas del servidor
async function getCurrencyValue() {
  try {
    // Realiza una solicitud GET al servidor para obtener los valores de las monedas
    const response = await fetch('http://localhost:3001/result');

    // Verifica si la solicitud fue exitosa (código de estado 200)
    if (response.ok) {
      // Parsea la respuesta JSON para obtener los valores de las monedas
      const data = await response.json();

      // Obtiene los valores de dólar y euro
      const dolarValue = data.dolarValue;
      const eurValue = data.eurValue;
      console.log('Dólar:', dolarValue);

      // Muestra los valores de las monedas en la página
      document.getElementById('result').innerHTML = `
        <p>Dólar: ${dolarValue}</p>
        <p>Euro: ${eurValue}</p>
      `;
    } else {
      // Muestra un mensaje de error si la solicitud no fue exitosa
      console.error('Error al obtener datos. Código de estado:', response.status);
    }
  } catch (error) {
    // Maneja errores de solicitud
    console.error('Error:', error.message);
  }
}
