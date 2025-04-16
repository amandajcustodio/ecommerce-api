import express from "express";

const app = express();
console.log(app);

app.get("/", (req, res) => {
  res.send("Primeira rota da API!");
});

app.listen(3000, () => {
  console.log("Hello World!");
});