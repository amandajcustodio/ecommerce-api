import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  private authService: AuthService;
  private userRepository: UserRepository;

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  public async getById(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    return user;
  }

  public async create(user: User): Promise<void> {
    const userAuth = await this.authService.create(user);
    user.id = userAuth.uid;

    await this.userRepository.update(user);
  }

  public async update(userId: string, user: User): Promise<void> {
    const _user = await this.userRepository.getById(userId);

    if (!_user) {
      throw new NotFoundError("Não foi possível atualizar o usuário!");
    }

    _user.name = user.name;
    _user.email = user.email;
    
    await this.authService.update(userId, user);
    await this.userRepository.update(_user);
  }

  public async delete(userId: string): Promise<void> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError("Não foi possível deletar o usuário!");
    }

    await this.authService.delete(userId);
    await this.userRepository.delete(userId);
  }
}