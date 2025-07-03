import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/user.service";

export class UsersController {
  
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).send(await new UserService().getAll());
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    res.status(200).send(await new UserService().getById(req));
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    await new UserService().create(req);

    res.status(201).send({
      message: "Usuário criado com sucesso!"
    });
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    await new UserService().update(req);
  
    res.status(200).send({
      message: "Usuário atualizado com sucesso!"
    });
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    await new UserService().delete(req);
    res.status(204).end();
  }
}