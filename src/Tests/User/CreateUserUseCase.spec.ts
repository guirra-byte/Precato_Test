import { UserRepositoryInMemory } from "../../Modules/User/repository/In-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../Modules/User/services/useCases/CreateUser/CreateUserUseCase";

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create a new User", () => {

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  test("Should be able create a new User", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test"
    }

    const { name, email } = user;

    await createUserUseCase
      .execute(name, email);

    const findUser = await userRepository
      .findOne(email);

    expect(findUser)
      .toHaveProperty("id");

  })
});