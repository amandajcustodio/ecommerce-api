import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { EmailAlreadyExists } from "../errors/email-already-exists.error";

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
}