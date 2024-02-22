const express = require('express');
const app = express();
// conexión a la base de datos

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://chaconp560:juanpablo123@pablo.mfkiod2.mongodb.net/", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// const {
//   teacherPatch,
//   teacherPost,
//   teacherGet,
//   teacherDelete
// } = require("./controllers/teacherController.js");

const {
  carreraPost,
  carreraGet,
  carreraPut,
  carreraDelete
} = require("./controllers/carrerasController.js");

// parser para el cuerpo de la solicitud (necesario para los métodos POST y PUT)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// verificar cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// // escuchar las solicitudes
// app.get("/api/teachers", teacherGet);
// app.post("/api/teachers", teacherPost);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);

// rutas para las carreras
app.get("/api/carreras", carreraGet);
app.post("/api/carreras", carreraPost);
app.put("/api/carreras", carreraPut);
app.delete("/api/carreras", carreraDelete);

app.listen(3000, () => console.log(`Aplicación iniciando en el puerto 3000!`));
