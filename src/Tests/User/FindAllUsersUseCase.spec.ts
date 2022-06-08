import { UserRepositoryInMemory } from "../../Modules/User/repository/In-memory/UserRepositoryInMemory";
import { FindAllUsersUseCase } from "../../Modules/User/services/useCases/FindAllUsers/FindAllUsersUseCase";

let userRepository: UserRepositoryInMemory;
let findAllUsersUseCase: FindAllUsersUseCase;

describe("Find all Users", () => {

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
  });

  test("Should be able find All Users", async () => {

    const users = {

      user1: {

        name: "User1 Name Test",
        email: "User1 Name Test"
      },
      user2: {

        name: "User2 Name Test",
        email: "User2 Name Test"
      },
      user3: {

        name: "User3 Name Test",
        email: "User3 Email Test"
      }
    }

    const { user1, user2, user3 } = users;

    await userRepository
      .create({ name: user1.name, email: user1.email });

    const findUser1 = await userRepository
      .findOne(user1.email);


    await userRepository
      .create({ name: user2.name, email: user2.email });

    const findUser2 = await userRepository
      .findOne(user2.email);


    await userRepository
      .create({ name: user3.name, email: user3.email });

    const findUser3 = await userRepository
      .findOne(user3.email);

    const findAllUsers = await userRepository
      .findAll();

    expect(findAllUsers)
      .toMatchObject([findUser1, findUser2, findUser3]);
  })
});