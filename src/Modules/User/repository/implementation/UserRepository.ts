import { IFindUserRequestProps, IUserRepository, IUserRequestProps } from "../IUserRepository";
import { prisma } from "../../../../Prisma/Client/Client.prisma";

export class UserRepository implements IUserRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: UserRepository;

  static getInstance(): UserRepository {

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository(prisma);
    }

    return UserRepository.INSTANCE;
  }

  async create({ name, email }: IUserRequestProps): Promise<void> {

    const createUser = await this
      .repository
      .users
      .create(
        {
          data: {
            name,
            email,
            User_sub:
            {
              create:
                { name }
            }
          }
        });
  }

  async findOne(email: string): Promise<IFindUserRequestProps | undefined> {

    const findOneUser = await this
      .repository
      .users
      .findUnique({
        where: {
          email: email
        },

      });

    if (findOneUser === null) {

      return undefined;
    }

    const findUserRequestProps: IFindUserRequestProps = {

      props: {

        name: findOneUser.name,
        email: findOneUser.email,
        sub_id: findOneUser.sub_id
      },
      id: findOneUser.id
    }

    return findUserRequestProps;
  }

  async findAll(): Promise<IFindUserRequestProps[]> {

    const findAllUsers = await this
      .repository
      .users
      .findMany();

    const testFindAllSubs = await this
      .repository
      .subs
      .findMany();

    const users: IFindUserRequestProps[] = [];

    findAllUsers.forEach(async (user) => {

      const findUserProps: IFindUserRequestProps = {

        props: {

          name: user.name,
          email: user.email,
          sub_id: user.sub_id
        },
        id: user.id
      }

      await users
        .push(findUserProps);

    });

    return users;
  }

  async findById(sub: string): Promise<IFindUserRequestProps | undefined> {

    const findUserById = await this
      .repository
      .users
      .findUnique({ where: { id: sub } });

    if (findUserById === null) {

      return undefined;
    }

    const props = findUserById;

    const findUserRequestProps: IFindUserRequestProps = {

      props: {

        name: props.name,
        email: props.email,
        sub_id: props.sub_id

      },
      id: props.id
    }

    return findUserRequestProps;
  }
}