import { prisma } from "../../../../../Prisma/Client/Client.prisma";

import { ISubRepository } from "../../../../Sub/Repository/ISubRepository";
import { IMessageRepository } from "../../../Repository/IMessageRepository"

import { MailModelUseCase } from "../../../../Mail/Services/useCases/MailModelUseCase/MailModelUseCase";

export class MessagesFlowUseCase {

  constructor(

    private mailModelUseCase: MailModelUseCase,
    private messagesRepository: IMessageRepository,
    private subRepository: ISubRepository

  ) { }

  async execute(): Promise<void> {

    const to = "precato@gmail.test.com";

    // ---- Messages ----
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

        const getUserEmail = await prisma
          .users
          .findUnique({ where: { name: sub.props.name } });

        if (getUserEmail !== null) {

          const { email } = getUserEmail;

          const sendMail = await this
            .mailModelUseCase
            .execute(message.props.template_name, "Send Mail Test", to, email);

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