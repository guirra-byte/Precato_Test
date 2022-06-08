import { MessageRepositoryInMemory } from "../../Modules/Message/Repository/In-memory/MessageRepositoryInMemory";
import { RemoveLastMessageUseCase } from '../../Modules/Message/Services/useCases/RemoveLastMessage/RemoveLastMessageUseCase';
import { SubRepository } from "../../Modules/Sub/Repository/Implementation/SubRepository";

let messageRepository: MessageRepositoryInMemory;
let removeLastMessageUseCase: RemoveLastMessageUseCase;

describe("Create a new Message", () => {

  beforeEach(async () => {

    messageRepository = new MessageRepositoryInMemory();
    removeLastMessageUseCase = new RemoveLastMessageUseCase(messageRepository);
  });

  test("Should be able remove a last Message", async () => {

    const messages = {

      message1: {

        template_name: "Message1 Template Name Test"
      },
      message2: {

        template_name: "Message2 Template Name Test"
      },
      message3: {

        template_name: "Message3 Template Name Test"
      }
    }

    const { message1, message2, message3 } = messages;

    await messageRepository
      .create({ template_name: message3.template_name });

    await messageRepository
      .create({ template_name: message2.template_name });

    const findMessage2 = await messageRepository.findOne(message2.template_name);

    await messageRepository
      .create({ template_name: message1.template_name });

    const findMessage1 = await messageRepository.findOne(message1.template_name);

    await removeLastMessageUseCase
      .execute()

    const findAllMessages = await messageRepository
      .findAll();

    const allMessages = [{ findMessage2, findMessage1 }];

    expect(findAllMessages)
      .toMatchObject(allMessages);
  })
});