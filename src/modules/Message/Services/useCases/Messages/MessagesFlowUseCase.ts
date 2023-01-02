import { prisma } from "../../../../../shared/prisma/Client/Client.prisma";
import { AppError } from "../../../../../shared/errors/AppError";
import { ISubAllPropsRequestDTO, ISubRepository } from "../../../../Sub/Repository/ISubRepository";
import { IMessageRepository } from "../../../Repository/IMessageRepository";
import { MailModelUseCase } from "../../../../Mail/Services/useCases/MailModelUseCase/MailModelUseCase";
import { IDateProvider } from "../../../../../shared/providers/dateProvider/IDateProvider";
import { SubCases } from "../../../../Sub/model/sub";

interface ISubCases {
  name: string,
  sub: string
}

export class MessagesFlowUseCase {
  constructor(
    private mailModelUseCase: MailModelUseCase,
    private messagesRepository: IMessageRepository,
    private subRepository: ISubRepository,
    private dateProvider: IDateProvider
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

    const filterMessagesCases = async (subsCases: ISubCases[]) => {
      let messageCase;
      
      const getMessagesBasedInCase = subsCases.map(receiverSub => 
        this.messagesRepository.findOne(SubCases === receiverSub.name))
    }
   
    const allMessages = await this
      .messagesRepository
      .findAll();

    const allMessagesLength = allMessages
      .length;

    const lastMessageOfAllMessages = allMessagesLength - 1;
    const findMessage = allMessages[lastMessageOfAllMessages];
    const messagePosition = findMessage.props.id;
    // ---- ** ----

    // ---- Subs ----
    const allSubs = await this
      .subRepository
      .findAll();

    const allSubsLength = allSubs
      .length;

    // ---- ** ---- 

    //Looping Message Flow, com Envio de Email

    for (let indice = 0; indice < allSubsLength; indice++) {
      let sub = allSubs[indice];

      const { props, id } = sub;

      if (props.active === true && id !== undefined) {
        let lastMessageProps = lastMessageOfAllMessages;

        const message = allMessages[lastMessageProps];

        const { expect_send_date } = message.props;

        const compareDates = await this
          .dateProvider
          .compareInHour(expect_send_date);

        if (compareDates !== 0) {
          throw new AppError("Does have messages!");
        }

        const getUserEmail = await prisma
          .users
          .findUnique({ where: { name: sub.props.name } });

        if (getUserEmail !== null) {
          const { email } = getUserEmail;

          to.map(sendTo => {
            await this.mailModelUseCase.execute(
              message.props.template_name,
              message.props.description,
              sendTo,
              email
              );
          })

          await this
            .subRepository
            .updateLastMessage(id, messagePosition);
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