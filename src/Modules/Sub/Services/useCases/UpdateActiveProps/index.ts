import { SubRepository } from "../../../Repository/Implementation/SubRepository";
import { UpdateActivePropsUseCase } from "./UpdateActivePropsUseCase";
import { UpdateActivePropsController } from "./UpdateActivePropsController";

const subRepository = SubRepository.getInstance();

const updateActivePropsUseCase = new UpdateActivePropsUseCase(subRepository);

const updateActivePropsController = new UpdateActivePropsController(updateActivePropsUseCase);

export { updateActivePropsController }