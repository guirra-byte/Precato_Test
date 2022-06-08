import { IFindUserRequestProps, IUserRepository, IUserRequestProps } from "../IUserRepository";
import { User } from "../../model/user";


export class UserRepositoryInMemory implements IUserRepository {

  private repository: User[];

  constructor() {

    this.repository = [];
  }

  async create({ name, email }: IUserRequestProps): Promise<void> {

    const user = {

      props: {

        name: name,
        email: email
      }

    }

    const createUser = User
      .create(user.props);

    await this
      .repository
      .push(createUser);

  }

  async findOne(email: string): Promise<IFindUserRequestProps | null> {

    const findOneUser = await this
      .repository
      .find((user) => email === user.props.email);

    if (findOneUser === undefined) {

      return null;
    }

    const findOneUserRequest: IFindUserRequestProps = {

      props: {

        name: findOneUser.props.name,
        email: findOneUser.props.email
      },
      id: findOneUser.id
    }

    return findOneUserRequest;
  }

  async findAll(): Promise<IFindUserRequestProps[]> {

    const findAllUsers = await this
      .repository;

    const users: IFindUserRequestProps[] = [];

    findAllUsers.forEach(async (user) => {

      const newUserRequestProps: IFindUserRequestProps = {

        props: {

          name: user.props.name,
          email: user.props.email
        },
        id: user.id
      }

      await users
        .push(newUserRequestProps);
    });

    return users;
  }
}