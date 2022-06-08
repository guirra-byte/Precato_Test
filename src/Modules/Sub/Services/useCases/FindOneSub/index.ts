import { SubRepository } from "../../../Repository/Implementation/SubRepository";
import { FindOneSubUseCase } from "./FindOneSubUseCase";
import { FindOneSubController } from "./FindOneSubController";

const subRepository = SubRepository.getInstance();

const findOneSubUseCase = new FindOneSubUseCase(subRepository);

const findOneSubController = new FindOneSubController(findOneSubUseCase);

export { findOneSubController }