import { UserRepository } from "../../../repository/implementation/UserRepository";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";
import { FindUserByIdController } from "./FindUserByIdController";

const userRepository = UserRepository.getInstance();

const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);

const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

export { findUserByIdController }