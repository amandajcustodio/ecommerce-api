import express, { Request, Response } from "express";

const app = express();
app.use(express.json()); // Diz que a API e o front utilizarão arquivos .json

type User = {
	id: number;
	name: string;
	email: string
}

let users: User[] = [];
let id: number = 0;

app.get("/", (req: Request, res: Response) => {
  res.send("Primeira rota da API!");
});

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
	const userId = +(req.params.id);
	const user = users.find(u => u.id === userId);
	res.send(user);
});

app.post("/users", (req: Request, res: Response) => {
  const user = req.body;
  user.id = ++id; // Incrementa o valor da variável antes de utiliza-la

  users.push(user);

  res.send({
    message: "Usuário criado com sucesso!"
  });
});

app.put("/users/:id", (req: Request, res: Response) => {
  const userId = +(req.params.id);
  const newUser = req.body;
  const i = users.findIndex(u => u.id === userId);

  if (i === -1) {
    res.status(404).send({
      message: "Não foi possível encontrar o usuário :("
    });
  }

  users[i] = {
    ...users[i],
    ...newUser
  }

  res.send({
    message: "Usuário atualizado com sucesso!"
  });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const userId = +(req.params.id);
  const i = users.findIndex(u => u.id === userId);

  if (i === -1) {
    res.status(404).send({
      message: "Não foi possível encontrar o usuário :("
    })
  }

  users.splice(i, 1);

  res.send({
    message: "Usuário deletado com sucesso!"
  });
});

app.listen(3000);