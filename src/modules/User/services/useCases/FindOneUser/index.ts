import { UserRepository } from "../../../repository/implementation/UserRepository";
import { FindOneUserUseCase } from "./FindOneUserUseCase";
import { FindOneUserController } from "./FindOneUserController";

const userRepository = UserRepository.getInstance();

const findOneUserUseCase = new FindOneUserUseCase(userRepository);

const findOneUserController = new FindOneUserController(findOneUserUseCase);

export { findOneUserController }