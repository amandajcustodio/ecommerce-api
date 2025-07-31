import { User } from "../models/user.model";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { EmailAlreadyExists } from "../errors/email-already-exists.error";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { FirebaseError } from "firebase/app";

export class AuthService {
  public async create(user: User): Promise<UserRecord> {
    return await getAuth().createUser({
      email: user.email,
	    password: user.password,
	    displayName: user.name
    })
    .catch((error) => {
      if (error.code === "auth/email-already-exists")
        throw new EmailAlreadyExists();

      throw error;
    });
  }

  public async update(id: string, user: User): Promise<void> {
    const props: UpdateRequest = {
      displayName: user.name,
      email: user.email
    }

    await getAuth().updateUser(id, props);
  }

  public async delete(id: string): Promise<void> {
    await getAuth().deleteUser(id);
  }

  public async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
    .catch(error => {
      if (error instanceof FirebaseError && error.code === "auth/invalid-credential") 
        throw new UnauthorizedError();

      throw error;
    });
  }
}