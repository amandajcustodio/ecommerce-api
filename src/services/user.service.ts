import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
  private readonly collection = "users";

  public async getAll(): Promise<User[]> {
    const snapshot = await getFirestore().collection(this.collection).get();
  
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    });
  }

  public async getById(userId: string): Promise<User> {
    const doc = await getFirestore().collection(this.collection).doc(userId).get();

    if (!doc.exists) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    return {
      id: doc.id,
      ...doc.data()
    } as User;
  }

  public async create(user: User): Promise<void> {
    await getFirestore().collection(this.collection).add(user);
  }

  public async update(userId: string, user: User): Promise<void> {
    const docRef = await getFirestore().collection(this.collection).doc(userId);
    const currUser = await docRef.get();

    if (!currUser.exists) {
      throw new NotFoundError("Não foi possível atualizar o usuário!");
    }

    const newUser: User = {
      ...currUser.data(),
      ...user
    }

    await docRef.set(newUser)
  }

  public async delete(userId: string): Promise<void> {
    const docRef = await getFirestore().collection(this.collection).doc(userId);
    const user = await docRef.get();

    if (!user.exists) {
      throw new NotFoundError("Não foi possível deletar o usuário!");
    }

    await docRef.delete();
  }
}