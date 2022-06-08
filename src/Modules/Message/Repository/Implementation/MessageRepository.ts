import { IMessageAllPropsRequestDTO, IMessageRepository, IMessageRequestPropsDTO } from "../IMessageRepository";
import { prisma } from "../../../../Prisma/Client/Client.prisma";

export class MessageRepository implements IMessageRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: MessageRepository;

  static getInstance(): MessageRepository {

    if (!MessageRepository.INSTANCE) {

      MessageRepository.INSTANCE = new MessageRepository(prisma);
    }

    return MessageRepository.INSTANCE;
  }

  async create({ template_name }: IMessageRequestPropsDTO): Promise<void> {

    const createMessage = await this
      .repository
      .messages
      .create({ data: { template_name } });
  }

  async findOne(template_name: string): Promise<IMessageAllPropsRequestDTO | undefined> {

    const findOneMessage = await this
      .repository
      .messages
      .findUnique({ where: { template_name: template_name } });

    if (findOneMessage === null) {

      return undefined;
    }

    const messageAllProps: IMessageAllPropsRequestDTO = {

      props: {

        template_name: findOneMessage.template_name,
        position: findOneMessage.position
      },
      id: findOneMessage.id
    }

    return messageAllProps;

  }

  async findAll(): Promise<IMessageAllPropsRequestDTO[]> {

    const findAllMessages = await this
      .repository
      .messages
      .findMany();

    const messages: IMessageAllPropsRequestDTO[] = [];

    findAllMessages.forEach(async (message) => {

      const messagesProps: IMessageAllPropsRequestDTO = {

        props: {

          template_name: message.template_name,
          position: message.position
        },
        id: message.id
      }

      await messages
        .push(messagesProps);

    });

    return messages;
  }

  async removeLastMessage(): Promise<void> {

    const findAllMessages = await this
      .repository
      .messages
      .findMany(
        {
          orderBy: { position: "desc" }
        });

    const firstMessage = findAllMessages[0];

    await this
      .repository
      .messages
      .delete({ where: { id: firstMessage.id } });
  }
}