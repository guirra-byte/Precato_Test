import { SubRepositoryInMemory } from "../../Modules/Sub/Repository/In-memory/SubRepositoryInMemory";
import { FindAllSubsUseCase } from "../../Modules/Sub/Services/useCases/FindAllSubs/FindAllSubsUseCase";

let subRepository: SubRepositoryInMemory;
let findAllSubsUseCase: FindAllSubsUseCase;

describe("Find All Subs", () => {

  beforeEach(async () => {

    subRepository = new SubRepositoryInMemory();
    findAllSubsUseCase = new FindAllSubsUseCase(subRepository);
  });

  test("Should be able find all Subs", async () => {

    const subs = {

      sub1: {

        name: "Sub1 Name test"
      },
      sub2: {

        name: "Sub2 Name Test"
      },
      sub3: {

        name: "Sub3 Name Test"
      }
    }
    const { sub1, sub2, sub3 } = subs;


    await subRepository
      .create({ name: sub1.name });

    const findSub1 = await subRepository
      .findOne(sub1.name);


    await subRepository
      .create({ name: sub2.name });

    const findSub2 = await subRepository
      .findOne(sub2.name);


    await subRepository
      .create({ name: sub3.name });

    const findSub3 = await subRepository
      .findOne(sub3.name);


    const findAllSubs = await subRepository
      .findAll();

    expect(findAllSubs)
      .toMatchObject([findSub1, findSub2, findSub3]);
  });
});