import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { ISubRepository } from "../../../sub/infra/prisma/repositories/ISubRepository";
import { IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";
import { MessagesFlowUseCase } from "../Messages/MessagesFlowUseCase";
import { IUpdateSubLastMessageDTO } from "../../../sub/dtos/IUpdateSubLastMessage";

export interface ITransportMessageReceiver {
    receiver: {
        email: string,
        actualCase: string,
    },
    msg: {
        msgCase: string,
        msgs: IMsgs[],       
    }
}

export interface IMsgs {
    id: string,
    msgDescription: string,
    position: number
    send_at: Date;
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

        let transportMessageReceivers: ITransportMessageReceiver[] = [];

        subs.map(sub => {
           const getMessageToSend = async () => {
            if(sub.props.subs_date !== undefined) {
                const ensure = await this.dateProvider
                .compareIsBefore(sub.props.subs_date);

                if(!ensure){
                    receivers.push(sub.props.email);
                }
            }

            const checkIsUndefined = async () => {
                if(
                    !sub.props.last_message 
                    && sub.id 
                    && sub.props.active
                  )
                    {
                    const [msgsInSubCase, dateNow] = await Promise.all([
                        await this.messageRepository.findAll()
                        .then(
                            msgs => msgs.filter(msg => msg.props.msgCases === sub.props.actualCase)
                            ),
                        await this.dateProvider.dateNow()
                    ]);
    
                    const msgsInSubCaseLength = msgsInSubCase.length - 1;
                    const getFirstMessageInFlow = msgsInSubCase[msgsInSubCaseLength];
    
                    const request: IUpdateSubLastMessageDTO = {
                        id: getFirstMessageInFlow.props.id,
                        msgCases: getFirstMessageInFlow.props.msgCases,
                        msgDescription: getFirstMessageInFlow.props.description,
                        subId: sub.id,
                        send_at: dateNow
                    }
    
                    sub.props.last_message = request;
                    msgsInSubCase.slice(1, msgsInSubCaseLength)

                    if(
                        msgsInSubCaseLength === 0 
                        && sub.props.last_message !== undefined 
                        && sub.props.active
                      )
                    {
                        //Atualizar caso atual do Sub;
                    } 

                    return sub.props.last_message.id;
                } else if (sub.props.last_message && sub.id){
                    return sub.props.last_message.id;
                }
            }

            const collectMsgsAndSend = async () => {
                const [msgToSend] = await Promise.all(
                    [
                        await this.messageRepository.findAll()
                            .then(msgs => msgs.filter(async (msg) => msg.props.id !== await checkIsUndefined()
                            && msg.props.msgCases === sub.props.actualCase)),       
                    ]);
                    
                    let overlapMsgsProps: IMsgs[] = [];

                    msgToSend.map(toSend => {
                       const mappedToSendMsgProps = async () => {
                        overlapMsgsProps.push({
                            id: toSend.props.id,
                            msgDescription: toSend.props.description,
                            position: msgToSend.findIndex(msg => msg.props === toSend.props),
                            send_at: toSend.props.expectSendDate
                        });
                       }

                       mappedToSendMsgProps();
                    });

                    transportMessageReceivers.push({
                        receiver: {
                            email: sub.props.email,
                            actualCase: sub.props.actualCase
                        },
                        msg: {
                            msgCase: sub.props.actualCase,
                            msgs: overlapMsgsProps,
                        }
                    });
            }  
            
            collectMsgsAndSend();
            }

            getMessageToSend();
        });


        await this.messagesFlow.execute(transportMessageReceivers);
    }
}