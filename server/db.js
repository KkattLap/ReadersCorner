const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 8080;

const sequelize = new Sequelize(
  "postgres://postgres:12345@localhost:5432/readersCorner"
);

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
