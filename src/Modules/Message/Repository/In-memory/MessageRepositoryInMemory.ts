import { ISubAllPropsRequestDTO } from "../../../Sub/Repository/ISubRepository";
import { Message } from "../../model/message";
import { IMessageAllPropsRequestDTO, IMessageRepository, IMessageRequestPropsDTO } from "../IMessageRepository";

export class MessageRepositoryInMemory implements IMessageRepository {

  private repository: Message[]

  constructor() {

    this.repository = []
  }

  async create({ template_name }: IMessageRequestPropsDTO): Promise<void> {

    const message = {

      props: {

        template_name: template_name
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

    if (findUniqueMessage === undefined) {

      return undefined;
    }

    const findUniqueProps: IMessageAllPropsRequestDTO = {

      props: {

        template_name: findUniqueMessage.props.template_name,
        position: findUniqueMessage.props.position
      },
      id: findUniqueMessage.id
    }

    return findUniqueProps;
  }

  async findAll(): Promise<IMessageAllPropsRequestDTO[]> {

    const findAll = await this.repository;

    const messages: IMessageAllPropsRequestDTO[] = []

    findAll.forEach(async (message) => {

      const messageProps: IMessageAllPropsRequestDTO = {

        props: {

          template_name: message.props.template_name,
          position: message.props.position
        },
        id: message.id
      }

      await messages
        .push(messageProps);
    });

    return messages;
  }

  async removeLastMessage(): Promise<void> {

    const allMessages = await this.repository;

    const lastMessage = allMessages[allMessages.length - 1];

    const findLastMessageProps = await this
      .repository
      .findIndex((message) => message.id === lastMessage.id);

    await this
      .repository
      .splice(findLastMessageProps);
  }
}