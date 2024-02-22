const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombre: { type: String },
  codigo: { type: String },
  descripcion: { type: String }
});

module.exports = mongoose.model('Carrera', carreraSchema);
