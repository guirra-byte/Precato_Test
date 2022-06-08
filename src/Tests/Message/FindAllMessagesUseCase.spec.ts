import { MessageRepositoryInMemory } from "../../Modules/Message/Repository/In-memory/MessageRepositoryInMemory";
import { FindAllMessagesUseCase } from "../../Modules/Message/Services/useCases/FindAllMessages/FindAllMessagesUseCase";

let messageRepository: MessageRepositoryInMemory;
let findAllMessagesUseCase: FindAllMessagesUseCase;

describe("Find All Messages", () => {

  beforeEach(async () => {

    messageRepository = new MessageRepositoryInMemory();
    findAllMessagesUseCase = new FindAllMessagesUseCase(messageRepository);
  });

  test("Should be able find All Messages", async () => {

    const messages = {

      msg1: {

        template_name: "Msg1 Message Test"
      },
      msg2: {

        template_name: "Msg2 Message Test"
      },
      msg3: {

        template_name: "Msg3 Message Test"
      }
    };

    const { msg1, msg2, msg3 } = messages;

    await messageRepository
      .create({ template_name: msg1.template_name });

    const findMsg1 = await messageRepository
      .findOne(msg1.template_name);


    await messageRepository
      .create({ template_name: msg2.template_name });

    const findMsg2 = await messageRepository
      .findOne(msg2.template_name);


    await messageRepository
      .create({ template_name: msg3.template_name });

    const findMsg3 = await messageRepository
      .findOne(msg3.template_name);

    const findAllMessages = await findAllMessagesUseCase
      .execute();

    expect(findAllMessages)
      .toMatchObject([findMsg1, findMsg2, findMsg3]);
  })
});