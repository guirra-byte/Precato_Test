import { AppError } from "../../../../shared/errors/AppError";
import { ISubRepository, ISubAllPropsRequestDTO } from "../../../sub/infra/prisma/repositories/ISubRepository"; 
import { IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";
import { MailModelUseCase } from "../../../mail/services/MailModelUseCase/MailModelUseCase"; 
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider"; 
import { SubCases } from "../../../sub/infra/model/sub";
import { IUserRepository } from "../../../user/infra/prisma/repositories/IUserRepository";

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

  async execute(to: string[]): Promise<void> {
    if(to.length === 0){
      throw new AppError(
      'A lista de destinatários está vazia!',
       400,
      'message_flow_use_case')
    }

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
   
    const allMessages = await this
      .messagesRepository
      .findAll();

    const allMessagesLength = allMessages
      .length;

    const lastMessageOfAllMessages = allMessagesLength - 1;
    const findMessage = allMessages[lastMessageOfAllMessages];
    const messaesitiPongo = findMessage.props.id;

    const allSubs = await this
      .subRepository
      .findAll();

    const allSubsLength = allSubs
      .length;

    for (let index = 0; index < ensureReceiverExists.length; index++) {
      const sub = ensureReceiverExists[index];
      const { props, id } = JSON.parse(sub) as ISubAllPropsRequestDTO;

      if (props.active === true && id !== undefined) {
        let caseMsgIndex: number[] = [];

        caseMsgIndex.push(
          allMessages.findIndex(
          msg => msg.props.template_name === props.actualCase
            )
        );

        for(let msgIndex = 0; msgIndex <= caseMsgIndex.length; msgIndex++){
          const message = allMessages[msgIndex];
          
          const compareDate = await this.dateProvider
          .compareIsBefore(message.props.expect_send_date)

          if(!compareDate){
            throw new AppError('As datas não coincidem!')
          }

          const subMail = await this.userRepository.findByName(props.name);

          if(subMail !== undefined){
            const from = '';

            ensureReceiverExists.map(toReceiver => {
              this.mailModelUseCase.execute(
                message.props.template_name,
                message.props.description ,
                toReceiver,
                from
              )
            });

            this.subRepository.updateLastMessage(id, msgIndex)
          }
        }

      }

    }

    const lastMessageProps = allMessages[lastMessageOfAllMessages];

    const { props } = lastMessageProps;

    if (props.id !== undefined) {

      await this
        .messagesRepository
        .removeLastMessage();

      const findMessageIndex = await allMessages
        .findIndex((message) => message.props.id === props.id);

      await allMessages
        .slice(findMessageIndex);
    }

  }
}