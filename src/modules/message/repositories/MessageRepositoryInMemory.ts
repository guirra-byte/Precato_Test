import { ISubAllPropsRequestDTO } from "../../sub/infra/prisma/repositories/ISubRepository";
import { Message } from "../infra/model/message";
import { IMessageAllPropsRequestDTO, IMessageRepository, IMessageRequestPropsDTO } from "../infra/prisma/repositories/IMessageRepository";

export class MessageRepositoryInMemory implements IMessageRepository {

  private repository: Message[]

  constructor() {

    this.repository = []
  }

  async create({ templateName, expectSendDate }: IMessageRequestPropsDTO): Promise<void> {

    const message = {
      props: {
        templateName: templateName,
        expectSendDate: expectSendDate
      }
    }

    const createMessage = Message
      .create(message.props);

    await this
      .repository
      .push(createMessage);
  }

  async findOne(template_name: string): Promise<IMessageAllPropsRequestDTO | undefined> {
    const findUniqueMessage = await this
      .repository
      .find((message) => template_name === message.props.template_name);

    const findUniqueMessageIndex = await this
      .repository
      .findIndex((message) => template_name === message.props.template_name);

    if (findUniqueMessage === undefined || findUniqueMessageIndex === undefined) {

      return undefined;
    }

    const findUniqueProps: IMessageAllPropsRequestDTO = {
      props: {
        templateName: findUniqueMessage.props.template_name,
        id: findUniqueMessage.props.id
      }
    }

    return findUniqueProps;
  }

  async findAll(): Promise<IMessageAllPropsRequestDTO[]> {

    const findAll = await this.repository;

    const messages: IMessageAllPropsRequestDTO[] = []

    findAll.forEach(async (message) => {

      const element = message;
      const getMessageIndex = findAll.indexOf(element);

      const messageProps: IMessageAllPropsRequestDTO = {

        props: {

          templateName: message.props.template_name,
          id: getMessageIndex
        }
      }

      await messages
        .push(messageProps);
    });

    return messages;
  }

  async removeLastMessage(): Promise<void> {

    const allMessages = await this.repository;

    for (let indice in allMessages) {

      const indiceAsNumber = parseInt(indice);

      const lastMessage = allMessages.length - 1;

      if (indiceAsNumber === lastMessage) {
        await this
          .repository
          .splice(lastMessage);
      }

    }
  }
}