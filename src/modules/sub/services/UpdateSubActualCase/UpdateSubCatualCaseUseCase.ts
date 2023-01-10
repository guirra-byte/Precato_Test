import { AppError } from "../../../../shared/errors/AppError";
import { ISubRepository } from "../../infra/prisma/repositories/ISubRepository";
import { subCasesConfig } from "../../../../config/subCasesConfig";

export class UpdateSubActualCaseUseCase {
    constructor(private subRepository: ISubRepository){}

    async execute(email: string): Promise<void>{
        const sub = await this.subRepository.findByEmail(email);

        if(!sub){
            throw new AppError(
            'Não foi possível encontrar o sub com este email!',
            400,
            'update_sub_actual_case'
            );
        }

        if(
            sub.props.actualCase === subCasesConfig.cases.FINALLY ||
            sub.props.actualCase === subCasesConfig.cases.PROCESS_ERROR ||
            sub.props.actualCase === subCasesConfig.cases.STAND_BY){
            sub.props.active = false;
            } else {
                const { actualCase } = sub.props;
                const getCaseId = subCasesConfig.integrationIds[subCasesConfig.cases.FINALLY]
            }

    }
}
