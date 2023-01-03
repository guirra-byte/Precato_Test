import { IUserRepository } from "../IUserRepository";
import { prisma } from "../../../../../../shared/prisma/Client/Client.prisma";
import { IUserDTO } from "../../../../dtos/IUserDTO";
import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";

export class UserRepository implements IUserRepository {
  constructor(private repository: typeof prisma.users) { }
  private static INSTANCE: UserRepository;

  static getInstance(): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository(prisma.users);
    }

    return UserRepository.INSTANCE;
  }

  async create({ name, email }: ICreateUserDTO): Promise<void> {

    const createUser = await this
      .repository
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

  async findOne(email: string): Promise<IUserDTO | undefined> {

    const findOneUser = await this
      .repository
      .findUnique({
        where: {
          email: email
        },

      });

    if (findOneUser === null) {

      return undefined;
    }

    const findUserRequestProps: IUserDTO = {

      props: {

        name: findOneUser.name,
        email: findOneUser.email,
        sub_id: findOneUser.sub_id
      },
      id: findOneUser.id
    }

    return findUserRequestProps;
  }

  async findAll(): Promise<IUserDTO[]> {

    const findAllUsers = await this
      .repository
      .findMany();

    const testFindAllSubs = await this
      .repository
      .subs
      .findMany();

    const users: IUserDTO[] = [];

    findAllUsers.forEach(async (user) => {

      const findUserProps: IUserDTO = {

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

  async findById(sub: string): Promise<IUserDTO | undefined> {

    const findUserById = await this
      .repository
      .findUnique({ where: { id: sub } });

    if (findUserById === null) {

      return undefined;
    }

    const props = findUserById;

    const findUserRequestProps: IUserDTO = {

      props: {

        name: props.name,
        email: props.email,
        sub_id: props.sub_id

      },
      id: props.id
    }

    return findUserRequestProps;
  }

  async findByName(name: string): Promise<IUserDTO | undefined> {
    let user = {} as IUserDTO;
    
    const props = await this.repository.findUnique({ where: { name: name } });
    Object.assign(user, props);

    return user;
  }
}