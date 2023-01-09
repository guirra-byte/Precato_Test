import { AppError } from "../../../../shared/errors/AppError";
import { ISubRepository } from "../../../sub/infra/prisma/repositories/ISubRepository"; 
import { IMessageAllPropsRequestDTO, IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";
import { MailModelUseCase } from "../../../mail/services/MailModelUseCase/MailModelUseCase"; 
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider"; 
import { SubCases } from "../../../sub/infra/model/sub";
import { IUserRepository } from "../../../user/infra/prisma/repositories/IUserRepository";
import { ISubAllPropsRequestDTO } from "../../../sub/dtos/ISubAllPropsRequestDTO";
import { IMsgs, ITransportMessageReceiver } from "../RequestMessageReceivers/RequestMessageReceiversUseCase";

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

  async execute(data: ITransportMessageReceiver[]): Promise<void> {

    const [msgs, receivers] = await Promise.all(
      [
        data.map(object => object.msg),
        data.map(object => object.receiver)
      ]);

    if(data.length === 0){
      throw new AppError(
      'A lista de destinatários está vazia!',
       400,
      'message_flow_use_case')
    }

    const from = '';

    const ensureReceiverExists= receivers.filter(async (receiver) => {
      const ensureReceiver = await this.subRepository.findByEmail(receiver.email);
      if(ensureReceiver !== undefined) return ensureReceiver;
    });
   
    for (let index = 0; index < ensureReceiverExists.length; index++) {
      const sub = ensureReceiverExists[index];

      const { actualCase, email } = sub;

      let caseMsgsIndex: IMsgs[] = [];

      const nextHours = '';
      const nextDay = '';
      const nextWeek = '';

      for(let m of msgs){
        m.msgs.map(msg => {
          async () => {
            const [
              compareInDays,
              compareInHours,
              dateNow,
              compareIsBefore
              ] = await Promise.all([
              await this.dateProvider.compareInDays(await this.dateProvider.dateNow(), msg.send_at),
              await this.dateProvider.compareInHour(msg.send_at),
              await this.dateProvider.dateNow(),
              await this.dateProvider.compareIsBefore(msg.send_at)
            ]);

            if(compareInDays < 7){
              if(compareInDays === 1){}
              if(compareInDays === 0){
                if(await this.dateProvider.addHours(compareInHours) === dateNow){
                  //Realizar relatório diário (Cron Job) para indentificar mensagens existentes
                }
              }
            }

            if(compareInDays >= 7){}
            
          }
        });

        const [dateNow, compareIsBefore] = await Promise.all([
          await this.dateProvider.dateNow(),
          await this.dateProvider.compareIsBefore()])
      }

      

      const { props, id } = JSON.parse(sub) as ISubAllPropsRequestDTO;

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