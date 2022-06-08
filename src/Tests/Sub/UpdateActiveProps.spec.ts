import { SubRepositoryInMemory } from "../../Modules/Sub/Repository/In-memory/SubRepositoryInMemory";
import { UpdateActivePropsUseCase } from "../../Modules/Sub/Services/useCases/UpdateActiveProps/UpdateActivePropsUseCase";

let subRepository: SubRepositoryInMemory;
let updateActivePropsUseCase: UpdateActivePropsUseCase;

describe("Update active prop", () => {

  beforeEach(async () => {

    subRepository = new SubRepositoryInMemory();
    updateActivePropsUseCase = new UpdateActivePropsUseCase(subRepository);

  });

  test("Should be able update active props", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test"
    }

    const { name, email } = user;

    await subRepository.create({ name });

    const findOneSub = await subRepository.findOne(name);

    expect(findOneSub)
      .toHaveProperty("id");

    if (findOneSub?.props !== undefined) {

      await updateActivePropsUseCase
        .execute(name);

      const findSubAgain = await subRepository.findOne(name);

      if (findSubAgain?.props !== undefined) {

        expect(findSubAgain.props.active)
          .toEqual(true);
      }
    }
  })
});