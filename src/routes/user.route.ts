import express, { Request, Response } from "express";

export const usersRoute = express.Router();
usersRoute.use(express.json());

type User = {
	id: number;
	name: string;
	email: string
}

let users: User[] = [];
let id: number = 0;

usersRoute.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

usersRoute.get("/users/:id", (req: Request, res: Response) => {
  const userId = +(req.params.id);
  const user = users.find(u => u.id === userId);

  res.send(user);
});

usersRoute.post("/users", (req: Request, res: Response) => {
  let newUser = req.body;
  newUser.id = ++id; // Incrementa o valor da variável antes de utiliza-la

  users.push(newUser);
  res.send({
    message: "Usuário criado com sucesso!"
  });
});

usersRoute.put("/users/:id", (req: Request, res: Response) => {
  const userId = +(req.params.id);
  const newUser = req.body;
  const i = users.findIndex(u => u.id === userId);

  if (i === -1) {
    res.status(404).send({
      message: "Não foi possível encontrar o usuário :("
    });
    return;
  }

  users[i] = {
    ...users[i],
    ...newUser
  }

  res.send({
    message: "Usuário atualizado com sucesso!"
  });
});

usersRoute.delete("/users/:id", (req: Request, res: Response) => {
  const userId = +(req.params.id);
  const i = users.findIndex(u => u.id === userId);

  if (i === -1) {
    res.status(404).send({
      message: "Não foi possível encontrar o usuário :("
    });
    return;
  }

  users.splice(i, 1);
  res.send({
    message: "Usuário deletado com sucesso!"
  })
})
