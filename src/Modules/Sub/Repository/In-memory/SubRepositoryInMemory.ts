import { ISubAllPropsRequestDTO, ISubRepository, ISubRequestPropsDTO } from "../ISubRepository";
import { Sub } from "../../model/sub";

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

        sub_date: findOneSub.props.sub_date,
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

            sub_date: sub.props.sub_date,
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
}