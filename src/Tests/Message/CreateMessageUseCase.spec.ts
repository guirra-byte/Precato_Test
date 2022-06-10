import { MessageRepositoryInMemory } from "../../Modules/Message/Repository/In-memory/MessageRepositoryInMemory";
import { CreateMessageUseCase } from "../../Modules/Message/Services/useCases/CreateMessage/CreateMessageUseCase";

let messageRepository: MessageRepositoryInMemory;
let createMessageUseCase: CreateMessageUseCase;

describe("Create a new Message", () => {

  beforeEach(async () => {

    messageRepository = new MessageRepositoryInMemory();
    createMessageUseCase = new CreateMessageUseCase(messageRepository);
  });

  test("Should be able Create a new Message", async () => {

    const message = {

      template_name: "Message Template Name Test"
    }

    const { template_name } = message;

    await createMessageUseCase
      .execute(template_name);

    const findMessage = await messageRepository
      .findOne(template_name);

    if (findMessage?.props !== undefined) {

      expect(findMessage.props)
        .toHaveProperty("id");
    }

  })
});