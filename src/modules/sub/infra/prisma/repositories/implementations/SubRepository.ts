import { prisma } from "../../../../../../shared/prisma/Client/Client.prisma";
import { ISubAllPropsRequestDTO, ISubRepository } from "../ISubRepository";

export class SubRepository implements ISubRepository {
  constructor(private ormRepository: typeof prisma.subs) { }
  
  private static INSTANCE: SubRepository;
  static getInstance(): SubRepository {

    if (!SubRepository.INSTANCE) {

      SubRepository.INSTANCE = new SubRepository(prisma.subs);
    }

    return SubRepository.INSTANCE;
  }

  async create(name: string): Promise<void> {
    await this
      .ormRepository
      .create(
        { data: { name: name } })
  }

  async findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined> {
    const findOneSub = await this.ormRepository
    .findUnique({ where: { name: name } });

    if (findOneSub === null) {
      return undefined;
    }

    const findUniqueSub: ISubAllPropsRequestDTO = {
      id: findOneSub.id,
      props: {
        name: findOneSub.name,
        active: findOneSub.active,
        subs_date: findOneSub.subs_date,
        actualCase: findOneSub.actualCase
      }
    }

    return findUniqueSub;
  }

  async findByEmail(email: string): Promise<ISubAllPropsRequestDTO | undefined> {
    const sub = await this.ormRepository.findUnique({ where: { email: email } });
    
    if(sub === null){
      return undefined;
    }

    const findUniqueSub: ISubAllPropsRequestDTO = {
      id: sub?.id,
      props: {
        name: sub?.name,
        active: sub?.active,
        subs_date: sub?.subs_date,
        actualCase: sub.actualCase
      }
    }

    return findUniqueSub;
  }

  async findAll(): Promise<ISubAllPropsRequestDTO[]> {
    const allSubs: ISubAllPropsRequestDTO[] = [];

    const findAllSubs = await this.ormRepository.findMany();

    findAllSubs.forEach(async (sub) => {
      const findSubsProps: ISubAllPropsRequestDTO = {
        id: sub.id,
        props: {
          name: sub.name,
          active: sub.active,
          subs_date: sub.subs_date,
          actualCase: sub.actualCase
        },
      }

      allSubs
        .push(findSubsProps);
    });

    return allSubs;
  }

  async updateLastMessage(id: string, last_message: number): Promise<void> {
    const findSub = await this
      .ormRepository
      .subs
      .findUnique({ where: { id: id } });

    if (findSub === null) {
      return undefined;
    }

    await this.ormRepository.update(
        {
          where: { id: findSub.id },
          data: { last_message: last_message }
        });
  }

  async updateActiveProps(id: string): Promise<void> {
    await this.ormRepository.update(
        {
          where: {
            id: id
          },
          data: { active: false }
        });
  }
}