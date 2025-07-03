import { NextFunction, Request, Response } from "express"
import { getFirestore } from "firebase-admin/firestore"
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";

const collection: string = "users";

export class UsersController {
  
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    const snapshot = await getFirestore().collection(collection).get();

    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    });

    res.status(200).send(users);
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const doc = await getFirestore().collection(collection).doc(userId).get();

    if (!doc.exists) {
      throw new NotFoundError("Usuário não encontrado!");
    }
  
    res.status(200).send({
      id: doc.id,
      ...doc.data()
    });
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    await getFirestore().collection(collection).add(user)

    res.status(201).send({
      message: "Usuário criado com sucesso!"
    });
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const currUser = await getFirestore().collection(collection).doc(userId).get();
    const reqBody = req.body as User;

    if (!currUser.exists) {
      throw new NotFoundError("Não foi possível atualizar o usuário!");
    }

    const newUser: User = {
      ...currUser.data(),
      ...reqBody
    }

    await getFirestore().collection(collection).doc(userId).set(newUser)
  
    res.status(200).send({
      message: "Usuário atualizado com sucesso!"
    });
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const docRef = await getFirestore().collection(collection).doc(userId);
    const user = await docRef.get();

    if (!user.exists) {
      throw new NotFoundError("Não foi possível deletar o usuário!");
    }

    await docRef.delete();

    res.status(204).end();
  }
}