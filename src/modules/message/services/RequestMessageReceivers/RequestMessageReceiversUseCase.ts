import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { ISubRepository } from "../../../sub/infra/prisma/repositories/ISubRepository";
import { MessagesFlowUseCase } from "../Messages/MessagesFlowUseCase";

export class RequestMessageReceiversUseCase {
    constructor(
            private messagesFlow: MessagesFlowUseCase,
            private subRepository: ISubRepository,
            private dateProvider: IDateProvider
        ){}

    async execute (): Promise<void> {
        const subs = await this.subRepository.findAll();
        let receivers: string[] = [];

        subs.filter(async (sub) => {
            if(sub.props.subs_date !== undefined) {
                const ensure = await this.dateProvider
                .compareIsBefore(sub.props.subs_date);

                if(!ensure){
                    receivers.push(sub.props.email);
                }
            }
        });

        await this.messagesFlow.execute(receivers);
    }
}