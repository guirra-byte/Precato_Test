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

      let nextHours: IMsgs[] = [];
      let nextDay: IMsgs[] = [];
      let nextWeek: IMsgs[] = [];

      for(let m of msgs){
        for(let i = 0; i <= m.msgs.length; i++){
          const [compareInDays, compareInHours, dateNow, compareIsBefore] = await Promise.all(
            [
              await this.dateProvider.compareInDays(await this.dateProvider.dateNow(), m.msgs[i].send_at),
              await this.dateProvider.compareInHour(m.msgs[i].send_at),
              await this.dateProvider.dateNow(),
              await this.dateProvider.compareIsBefore(m.msgs[i].send_at)
            ]
          );

          if(compareInDays < 7){
            if(compareInDays === 1){
              nextDay.push(m.msgs[i])
              continue;
            }
            if(compareInDays === 0){
              if(
                await this.dateProvider.addHours(compareInHours) === dateNow 
                && compareIsBefore
                )
                {
                //Realizar relatório diário (Cron Job) para indentificar mensagens existentes
                //Realizar o envio da suposta mensagem
                //Atualizar qual será a próxima mensagem da fila
                }
              else{
                nextHours.push(m.msgs[i]);
                continue;
              }
            }
          }

          if(compareInDays >= 7){
            nextWeek.push(m.msgs[i]);
            continue;
          }
        }

      } 
    }
  }
}