import { prisma } from "../../../../../Prisma/Client/Client.prisma";
import { ISubRepository } from "../../../../Sub/Repository/ISubRepository";
import { IMessageAllPropsRequestDTO, IMessageRepository } from "../../../Repository/IMessageRepository";

export class MessagesFlowUseCase {

  constructor(

    private prismaClient: typeof prisma,
    private messagesRepository: IMessageRepository,
    private subRepository: ISubRepository

  ) { }

  async execute(): Promise<void> {

    //Todas as messages;
    const allMessages = await this
      .messagesRepository
      .findAll();

    //Saber o tamanho do Array de Messages
    const allMessagesLength = allMessages
      .length;

    //Last Message, foi a primeira a message a ser inserida;
    let lastMessageOfAllMessages = allMessagesLength - 1;

    //Todas as Subs
    const allSubs = await this
      .subRepository
      .findAll();

    //Saber o tamanho do Array de Subs
    const allSubsLength = allSubs
      .length;

    for (let indice = 0; indice <= allSubsLength; indice++) {

      let sub = allSubs[indice];

      const { props, id } = sub;

      if (props.active === true && id !== undefined) {

        let lastMessageProps = lastMessageOfAllMessages;

        props.last_message = lastMessageProps;

        await this
          .subRepository
          .updateLastMessage(id, lastMessageProps);
      }

    }

    const lastMessageProps = allMessages[lastMessageOfAllMessages];

    const { id } = lastMessageProps;

    if (id !== undefined) {

      await this
        .messagesRepository
        .removeLastMessage();

      const findMessageIndex = await allMessages
        .findIndex((message) => message.id === id);

      await allMessages
        .slice(findMessageIndex);
    }

  }
}