import { ISubAllPropsRequestDTO } from "../../../Sub/Repository/ISubRepository";
import { Message } from "../../model/message";
import { IMessageAllPropsRequestDTO, IMessageRepository, IMessageRequestPropsDTO } from "../IMessageRepository";

export class MessageRepositoryInMemory implements IMessageRepository {

  private repository: Message[]

  constructor() {

    this.repository = []
  }

  async create({ template_name, expect_send_date }: IMessageRequestPropsDTO): Promise<void> {

    const message = {

      props: {

        template_name: template_name,
        expect_send_date: expect_send_date
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

        template_name: findUniqueMessage.props.template_name,
        id: findUniqueMessageIndex
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

          template_name: message.props.template_name,
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

    // await this
    //   .repository
    //   .splice(findLastMessageProps);
  }
}