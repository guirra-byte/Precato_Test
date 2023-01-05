import { AppError } from "../../../../shared/errors/AppError";
import { ISubRepository } from "../../../sub/infra/prisma/repositories/ISubRepository"; 
import { IMessageAllPropsRequestDTO, IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";
import { MailModelUseCase } from "../../../mail/services/MailModelUseCase/MailModelUseCase"; 
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider"; 
import { SubCases } from "../../../sub/infra/model/sub";
import { IUserRepository } from "../../../user/infra/prisma/repositories/IUserRepository";
import { ISubAllPropsRequestDTO } from "../../../sub/dtos/ISubAllPropsRequestDTO";

interface ISubCases {
  name: string,
  sub: string
}

export class MessagesFlowUseCase {
  constructor(
    private mailModelUseCase: MailModelUseCase,
    private messagesRepository: IMessageRepository,
    private subRepository: ISubRepository,
    private dateProvider: IDateProvider,
    private userRepository: IUserRepository
  ) { }

  async execute(to: string[], msgs: IMessageAllPropsRequestDTO[]): Promise<void> {
    if(to.length === 0){
      throw new AppError(
      'A lista de destinatários está vazia!',
       400,
      'message_flow_use_case')
    }

    const from = '';

    const ensureReceiverExists = to.filter(async (receiver) => {
      const ensureReceiver = await this.subRepository.findByEmail(receiver);
      if(ensureReceiver !== undefined) return ensureReceiver;
    });

    const subCases: ISubCases[] = [];

    ensureReceiverExists.map(sub => {
      const parseSub = JSON.parse(sub) as ISubAllPropsRequestDTO;

      subCases.push({
        name: parseSub.props.actualCase as SubCases,
        sub: parseSub.props.name
      });
    });
   
    for (let index = 0; index < ensureReceiverExists.length; index++) {
      const sub = ensureReceiverExists[index];
      const { props, id } = JSON.parse(sub) as ISubAllPropsRequestDTO;

      if (props.active === true && id !== undefined) {
        let caseMsgIndex: number[] = [];

        caseMsgIndex.push(
          msgs.findIndex(
          msg => msg.props.templateName === props.actualCase
            )
        );

        for (const m of msgs){
          const { props: { expectSendDate } } = m;

          const [dateNow, compareIsBefore] = await Promise.all(
            [
              await this.dateProvider.dateNow(),
              await this.dateProvider.compareIsBefore(expectSendDate)
            ]);

          if(expectSendDate === dateNow && !compareIsBefore) continue; {
            await this.mailModelUseCase.execute(
                  m.props.templateName,
                  m.props.description,
                  props.email,
                  from
                );

            msgs.slice(0, msgs.findIndex(message => 
              message.props.id === m.props.id));
          }

        }

        for(let msgIndex = 0; msgIndex <= caseMsgIndex.length; msgIndex++){
          const message = msgs[msgIndex];
          
          const compareDate = await this.dateProvider
          .compareIsBefore(message.props.expectSendDate)

          if(!compareDate) continue; 

          const subMail = await this.userRepository.findByName(props.name);

          if(subMail !== undefined){
            

            ensureReceiverExists.map(toReceiver => {
              this.mailModelUseCase.execute(
                message.props.templateName,
                message.props.description ,
                toReceiver,
                from
              )
            });

            this.subRepository.updateLastMessage(
              { 
              id: message.props.id,
              msgDescription: message.props.description,
              send_at: message.props.expectSendDate,
              msgCases: SubCases['INBOUND'],
              subId: id 
              }
            );

            caseMsgIndex.slice(1, msgs
                .findIndex(msg => msg.props.id === message.props.id)
              );
          }
        }

      }

    }
  }
}