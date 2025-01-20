import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      createdAt: new Date(),
      id: `${this.users.length + 1}`,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
    };

    this.users.push(user);

    return user;
  }
}
