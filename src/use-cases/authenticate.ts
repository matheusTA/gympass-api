import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

interface AuthenticateUseCaseOutput {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({email, password}: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatchs = await  compare(password, user.passwordHash);

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError();
    }

    return {
      user
    };
  }
}
