require('dotenv').config();
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./graphql-schema.js');

const express = require('express');
const app = express();

//
const theSecretKey = process.env.JWT_SECRET;

const {
   courseGetAll, courseSearch
} = require("./controllers/courseController.js");

// Parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");
const courseModel = require('./models/courseModel.js');
const teacherModel = require('./models/teacherModel.js');

// Expose in the root element the different entry points of the
// GraphQL service
const graphqlResolvers = {
  getAllCourses: courseGetAll,
  searchCourses: (params) => courseSearch(params),
  hello: function() { return "Hola Mundo"},
  version: function() {return "1.0"}
};

// Middlewares
app.use(bodyParser.json());
// Check for CORS
app.use(cors({
  domains: '*',
  methods: "*"
}));

// JWT Authentication middleware
// ...

app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
