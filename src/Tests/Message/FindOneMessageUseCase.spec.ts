import { MessageRepositoryInMemory } from "../../Modules/Message/Repository/In-memory/MessageRepositoryInMemory";
import { FindOneMessageUseCase } from "../../Modules/Message/Services/useCases/FindOneMessage/FindOneMessageUseCase";

let messageRepository: MessageRepositoryInMemory;
let findOneMessageUseCase: FindOneMessageUseCase;

describe("Find Unique Message", () => {

  beforeEach(async () => {

    messageRepository = new MessageRepositoryInMemory();
    findOneMessageUseCase = new FindOneMessageUseCase(messageRepository);
  });

  test("Should be able find unique Message", async () => {

    const message = {

      template_name: "Message Template_Name Test"
    }

    const { template_name } = message;

    await messageRepository
      .create({ template_name });

    const findMessage = await findOneMessageUseCase
      .execute(template_name);

    expect(findMessage.props)
      .toHaveProperty("id");
  })
});

