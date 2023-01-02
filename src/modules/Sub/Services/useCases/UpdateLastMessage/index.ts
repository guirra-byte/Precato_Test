import { SubRepository } from "../../../Repository/Implementation/SubRepository";
import { UpdateLastMessageUseCase } from "./UpdateLastMessageUseCase";
import { UpdateLastMessageController } from "./UpdateLastMessageController";

const subRepository = SubRepository.getInstance();

const updateLastMessageUseCase = new UpdateLastMessageUseCase(subRepository);

const updateLastMessageController = new UpdateLastMessageController(updateLastMessageUseCase);

export { updateLastMessageController }