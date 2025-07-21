const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your Project API",
      version: "1.0.0",
      description: "API documentation for your full-stack project",
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
