import { NextFunction, Request, Response } from "express"
import { getFirestore } from "firebase-admin/firestore"

type User = {
  id: string;
  name: string;
  email: string
}

const collection: string = "users";

export class UsersController {
  
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const snapshot = await getFirestore().collection(collection).get();

      const users = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as User;
      });

      res.status(201).send(users);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const doc = await getFirestore().collection(collection).doc(userId).get();
    
      res.status(201).send({
        id: doc.id,
        ...doc.data()
      });
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;

      await getFirestore().collection(collection).add(user);

      res.status(204).send({
        message: "Usuário criado com sucesso!"
      });
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const newUser = req.body as User;

      await getFirestore().collection(collection).doc(userId).set(newUser)
    
      res.status(204).send({
        message: "Usuário atualizado com sucesso!"
      });
    } catch (error) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
    
      await getFirestore().collection(collection).doc(userId).delete();

      res.status(204).end({
        message: "Usuário deletado com sucesso!"
      });
    } catch (error) {
      next(error);
    }
  }
}