import { Request, Response } from "express"
import { getFirestore } from "firebase-admin/firestore"

type User = {
  id: string;
  name: string;
  email: string
}

const collection: string = "users";

export class UsersController {
  
  public static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection(collection).get();

    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    });

    res.send(users);
  }

  public static async getById(req: Request, res: Response) {
    const userId = req.params.id;
    const doc = await getFirestore().collection(collection).doc(userId).get();
  
    res.send({
      id: doc.id,
      ...doc.data()
    });
  }

  public static async create(req: Request, res: Response) {
    const user = req.body;

    await getFirestore().collection(collection).add(user);

    res.send({
      message: "Usuário criado com sucesso!"
    });
  }

  public static async update(req: Request, res: Response) {
    const userId = req.params.id;
    const newUser = req.body as User;

    await getFirestore().collection(collection).doc(userId).set(newUser)
  
    res.send({
      message: "Usuário atualizado com sucesso!"
    });
  }

  public static async delete(req: Request, res: Response) {
    const userId = req.params.id;
    
    await getFirestore().collection(collection).doc(userId).delete();

    res.send({
      message: "Usuário deletado com sucesso!"
    })
  }
}