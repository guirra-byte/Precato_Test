import { UserRepositoryInMemory } from "../../Modules/User/repository/In-memory/UserRepositoryInMemory";
import { IFindUserRequestProps } from "../../Modules/User/repository/IUserRepository";
import { FindUserByIdUseCase } from "../../Modules/User/services/useCases/FindUserById/FindUserByIdUseCase";

let userRepository: UserRepositoryInMemory;
let findUserByIdUseCase: FindUserByIdUseCase;

describe("Find User by Id", () => {

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  });

  test("Should be able find User by Id", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test"
    }

    const { name, email } = user;

    await userRepository
      .create({ name, email });

    const findUserProps = await userRepository
      .findOne(email);

    expect(findUserProps)
      .toHaveProperty("id");

    if (findUserProps?.id !== undefined) {

      const id = findUserProps.id;

      const findUserById = await findUserByIdUseCase
        .execute(id);

      const userRequestProps: IFindUserRequestProps = {

        props: {

          name: name,
          email: email
        },
        id: id
      }

      expect(findUserById)
        .toMatchObject(userRequestProps);

    }
  });
}
);