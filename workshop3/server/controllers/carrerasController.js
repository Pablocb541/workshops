// Importa el modelo de carrera
const Carrera = require("../models/carrerasModel");

/**
 * Crea una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const carreraPost = async (req, res) => {
  let carreras = new Carrera(req.body);
  await carreras.save()
    .then(carrera => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/carreras/?id=${carreras.id}`
      });
      res.json(carrera);
    })
    .catch(err => {
      res.status(422);
      console.log('Error al guardar la carrera', err);
      res.json({
        error: 'Hubo un error al guardar la carrera'
      });
    });
};

/**
 * Obtiene todas las carreras o una
 *
 * @param {*} req
 * @param {*} res
 */
const carreraGet = (req, res) => {
  // si se requiere una carrera específica
  if (req.query && req.query.id) {
    Carrera.findById(req.query.id)
      .then(carrera => {
        res.json(carrera);
      })
      .catch(err => {
        res.status(404);
        console.log('Error al consultar la carrera', err);
        res.json({ error: "La carrera no existe" });
      });
  } else {
    // obtener todas las carreras
    Carrera.find()
      .then(carreras => {
        res.json(carreras);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

/**
 * Actualiza una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const carreraPut = (req, res) => {
  Carrera.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then(carrera => {
      if (!carrera) {
        res.status(404).json({ error: "La carrera no existe" });
      } else {
        res.json(carrera);
      }
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Elimina una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const carreraDelete = (req, res) => {
  Carrera.findByIdAndDelete(req.query.id)
    .then(carrera => {
      if (!carrera) {
        res.status(404).json({ error: "La carrera no existe" });
      } else {
        res.json(carrera);
      }
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

module.exports = {
  carreraPost,
  carreraGet,
  carreraPut,
  carreraDelete
};
