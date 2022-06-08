import { IFindUserRequestProps, IUserRepository, IUserRequestProps } from "../IUserRepository";
import { prisma } from "../../../../Prisma/Client/Client.prisma";
import { User } from "../../model/user";

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

  async findOne(email: string): Promise<IFindUserRequestProps | null> {

    const findOneUser = await this
      .repository
      .users
      .findUnique({
        where: {
          email: email
        },

      });

    if (findOneUser === null) {

      return null;
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
}