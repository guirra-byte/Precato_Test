import { UserRepository } from "../../infra/prisma/repositories/implementation/UserRepository";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";
import { FindAllUsersController } from "./FindAllUsersController";

const userRepository = UserRepository.getInstance();

const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);

export { findAllUsersController }