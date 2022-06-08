import { UserRepositoryInMemory } from "../../Modules/User/repository/In-memory/UserRepositoryInMemory";
import { CreateUserAuthTokenUseCase } from "../../Modules/User/services/useCases/Token/Auth/CreateUserAuthTokenUseCase";

let userRepository: UserRepositoryInMemory;
let createUserAuthTokenUseCase: CreateUserAuthTokenUseCase;

describe("Create User Auth Token", () => {

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    createUserAuthTokenUseCase = new CreateUserAuthTokenUseCase(userRepository);
  });

  test("Should be able create User Auth Token", async () => {

    const user = {

      name: "User Auth Token Name Test",
      email: "User Auth Token Email Test"
    }

    const { name, email } = user;

    await userRepository
      .create({ name, email });

    const createToken = await createUserAuthTokenUseCase
      .execute(name, email);

    expect(createToken)
      .toHaveProperty("token");
  });
});