// swaggerOptions.js
module.exports = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Virtual Garden API",
        version: "1.0.0",
        description: "API documentation for the Virtual Garden project",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development server",
        },
      ],
    },
    // Paths to files containing Swagger annotations (adjust as necessary)
    apis: ["./routes/*.js", "./controllers/*.js"],
  };
  