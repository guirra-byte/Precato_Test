import { UserRepository } from '../../../../infra/prisma/repository/implementation/UserRepository';
import { CreateUserAuthTokenUseCase } from './CreateUserAuthTokenUseCase';
import { CreateUserAuthTokenController } from './CreateUserAuthTokenController';

const userRepository = UserRepository.getInstance();

const createUserAuthTokenUseCase = new CreateUserAuthTokenUseCase(userRepository);

const createUserAuthTokenController = new CreateUserAuthTokenController(createUserAuthTokenUseCase);

export { createUserAuthTokenController }