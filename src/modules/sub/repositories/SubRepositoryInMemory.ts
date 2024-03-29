import { ISubAllPropsRequestDTO, ISubRepository, ISubRequestPropsDTO } from "../infra/prisma/repositories/ISubRepository";
import { Sub } from "../infra/model/sub";

export class SubRepositoryInMemory implements ISubRepository {

  private repository: Sub[]

  constructor() {

    this.repository = []
  }

  async create({ name }: ISubRequestPropsDTO): Promise<void> {

    const sub = {

      props: {

        name: name,
        sub_date: new Date()
      }
    }

    const createSub = Sub
      .create(sub.props);

    await this
      .repository
      .push(createSub);
  }

  async findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined> {

    const findOneSub = await this
      .repository
      .find((sub) => name === sub.props.name);

    if (findOneSub === undefined) {

      return undefined;
    }

    const findOneSubRequest: ISubAllPropsRequestDTO = {

      props: {

        subs_date: findOneSub.props.sub_date,
        name: findOneSub.props.name,
        last_message: findOneSub.props.last_message,
        active: findOneSub.props.active
      },
      id: findOneSub.id

    }

    return findOneSubRequest;

  }

  async findAll(): Promise<ISubAllPropsRequestDTO[]> {

    const subs: ISubAllPropsRequestDTO[] = [];

    await this
      .repository
      .forEach(async (sub) => {

        const newSubProps: ISubAllPropsRequestDTO = {

          props: {

            subs_date: sub.props.sub_date,
            name: sub.props.name,
            last_message: sub.props.last_message,
            active: sub.props.active
          },
          id: sub.id
        }

        await subs
          .push(newSubProps);
      });

    return subs;
  }

  async updateActiveProps(id: string): Promise<void> {

    const findSub = await this
      .repository
      .find((sub) => id === sub.id);

    if (findSub !== undefined) {

      findSub.props.active = false;
    }
  }

  async updateLastMessage(id: string, last_message: number): Promise<void> {

    const findSub = await this
      .repository
      .find((sub) => id === sub.id);

    if (findSub !== undefined) {

      findSub.props.last_message = last_message;
    }
  }
}