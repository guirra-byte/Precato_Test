import { UserRepositoryInMemory } from "../../Modules/User/repository/In-memory/UserRepositoryInMemory";
import { FindOneUserUseCase } from "../../Modules/User/services/useCases/FindOneUser/FindOneUserUseCase";
import { IFindUserRequestProps } from '../../Modules/User/repository/IUserRepository';

let userRepository: UserRepositoryInMemory;
let findOneUserUseCase: FindOneUserUseCase;

describe("Find a unique User", () => {

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    findOneUserUseCase = new FindOneUserUseCase(userRepository);
  });

  test("Should be able find a unique User", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test"
    }

    const { name, email } = user;

    await userRepository
      .create({ name, email });

    const findUser = await findOneUserUseCase
      .execute(email);

    expect(findUser)
      .toHaveProperty("id");

  });
});