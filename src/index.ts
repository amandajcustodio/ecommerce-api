import express from "express";

const app = express();
console.log(app);

app.get("/", (req, res) => {
  res.send("Teste");
});

app.listen(3000, () => {
  console.log("Hello World!");
});