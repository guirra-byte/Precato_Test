import { SubRepositoryInMemory } from "../../Modules/Sub/Repository/In-memory/SubRepositoryInMemory";
import { ISubAllPropsRequestDTO, ISubRequestPropsDTO } from "../../Modules/Sub/Repository/ISubRepository";
import { FindOneSubUseCase } from "../../Modules/Sub/Services/useCases/FindOneSub/FindOneSubUseCase";

let subRepository: SubRepositoryInMemory;
let findOneSubUseCase: FindOneSubUseCase;

describe("Find unique Sub", () => {

  beforeEach(async () => {

    subRepository = new SubRepositoryInMemory();
    findOneSubUseCase = new FindOneSubUseCase(subRepository);
  });

  test("Should be able find unique Sub", async () => {

    const sub: ISubRequestPropsDTO = {

      name: "Sub Name Test"
    }

    const { name } = sub;

    await subRepository
      .create({ name });

    const findSub = await findOneSubUseCase
      .execute(name);

    const subRequest: ISubAllPropsRequestDTO = {

      props: {

        sub_date: findSub.props.sub_date,
        name: findSub.props.name,
        last_message: findSub.props.last_message,
        active: findSub.props.active
      },
      id: findSub.id
    }

    expect(findSub)
      .toMatchObject(subRequest);
  });

});