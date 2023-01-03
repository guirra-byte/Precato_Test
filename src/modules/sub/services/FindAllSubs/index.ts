import { SubRepository } from "../../../infra/prisma/repositories/SubRepository";
import { FindAllSubsUseCase } from "./FindAllSubsUseCase";
import { FindAllSubsController } from "./FindAllSubsController";

const subRepository = SubRepository.getInstance();

const findAllSubsUseCase = new FindAllSubsUseCase(subRepository);

const findAllSubsController = new FindAllSubsController(findAllSubsUseCase);

export { findAllSubsController }