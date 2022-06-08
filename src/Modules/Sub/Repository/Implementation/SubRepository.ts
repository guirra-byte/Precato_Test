import { prisma } from "../../../../Prisma/Client/Client.prisma";
import { ISubAllPropsRequestDTO, ISubRepository, ISubRequestPropsDTO } from "../ISubRepository";

export class SubRepository implements ISubRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: SubRepository;

  static getInstance(): SubRepository {

    if (!SubRepository.INSTANCE) {

      SubRepository.INSTANCE = new SubRepository(prisma);
    }

    return SubRepository.INSTANCE;
  }

  async create({ name }: ISubRequestPropsDTO): Promise<void> {

    const createSub = await this
      .repository
      .subs
      .create(
        { data: { name: name } })
  }

  async findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined> {

    const findOneSub = await this
      .repository
      .subs
      .findUnique({ where: { name: name } });

    if (findOneSub === null) {

      return undefined;
    }

    const findUniqueSub: ISubAllPropsRequestDTO = {

      props: {

        name: findOneSub.name,
        active: findOneSub.active,
        sub_date: findOneSub.subs_date,
      },
      id: findOneSub.id
    }

    return findUniqueSub;
  }

  async findAll(): Promise<ISubAllPropsRequestDTO[]> {

    const findAllSubs = await this
      .repository
      .subs
      .findMany();

    const subs: ISubAllPropsRequestDTO[] = [];

    findAllSubs.forEach(async (sub) => {

      const findSubsRequestProps: ISubAllPropsRequestDTO = {

        props: {

          name: sub.name,
          active: sub.active,
          sub_date: sub.subs_date
        },
        id: sub.id
      }

      await subs
        .push(findSubsRequestProps);

    });

    return subs;
  }

  async updateLastMessage(id: string, last_message: number): Promise<void> {

    const findSub = await this
      .repository
      .subs
      .findUnique({ where: { id: id } });

    if (findSub === null) {

      return undefined;
    }

    await this
      .repository
      .subs
      .update(
        {
          where: { id: findSub.id },
          data: { last_message: last_message }
        });
  }

  async updateActiveProps(id: string): Promise<void> {

    await this
      .repository
      .subs
      .update(
        {
          where: { id: id },
          data: { active: false }
        });
  }
}