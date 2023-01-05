import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { ISubRepository } from "../../../sub/infra/prisma/repositories/ISubRepository";
import { IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";
import { MessagesFlowUseCase } from "../Messages/MessagesFlowUseCase";

interface ITransportMessageReceiver {
    receiver: {
        email: string,
        actualCase: string,
    },
    msg: {
        msgCase: string,
        msgs: [{
            id: string,
            msgDescription: string,
            position: number
        }],       
    }
}

export class RequestMessageReceiversUseCase {
    constructor(
            private messagesFlow: MessagesFlowUseCase,
            private subRepository: ISubRepository,
            private dateProvider: IDateProvider,
            private messageRepository : IMessageRepository
        ){}

    async execute (): Promise<void> {
        const subs = await this.subRepository.findAll();
        let receivers: string[] = [];

        let transportMessageReceivers: ITransportMessageReceiver[];

        subs.map(sub => {
           const getMessageToSend = async () => {
            if(sub.props.subs_date !== undefined) {
                const ensure = await this.dateProvider
                .compareIsBefore(sub.props.subs_date);

                if(!ensure){
                    receivers.push(sub.props.email);
                }
            }

            const [msgToSend] = await Promise.all(
                [
                    await this.messageRepository.findAll()
                        .then(msgs => msgs.filter(msg => msg.props.id !== sub.props.last_message.id 
                        && msg.props.msgCases === sub.props.actualCase)),       
                ]);

                transportMessageReceivers.push({
                    receiver: {
                        email: sub.props.email,
                        actualCase: sub.props.actualCase
                    },
                    msg: {
                        msgCase: sub.props.actualCase,
                        msgs: msgToSend,
                    }
                })
            }

            
            getMessageToSend();
        });


        await this.messagesFlow.execute(receivers);
    }
}