import { CreateSubUseCase } from '../../Modules/Sub/Services/useCases/CreateSub/CreateSubUseCase';
import { SubRepositoryInMemory } from '../../Modules/Sub/Repository/In-memory/SubRepositoryInMemory';
import { ISubRequestPropsDTO } from '../../Modules/Sub/Repository/ISubRepository';

let createSubUseCase: CreateSubUseCase;
let subRepository: SubRepositoryInMemory;

describe("Create a new Sub", () => {

  beforeEach(async () => {

    subRepository = new SubRepositoryInMemory();
    createSubUseCase = new CreateSubUseCase(subRepository);

  });

  test("Should be able Create a new Subscription", async () => {

    const sub: ISubRequestPropsDTO = {

      name: "Sub Name Test"
    }

    const { name } = sub;

    await createSubUseCase
      .execute(sub);

    const findSub = await subRepository
      .findOne(name);

    expect(findSub)
      .toHaveProperty("id");

    expect(findSub)
      .not
      .toBeUndefined();

  })
});