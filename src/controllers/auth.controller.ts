import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const userRecord = await new AuthService().login(email, password);
    const token = userRecord.user.getIdToken(true);

    res.send({ token });
  }
}