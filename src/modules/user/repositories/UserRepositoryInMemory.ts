import { IUserRepository } from "../infra/prisma/repositories/IUserRepository";
import { IUserDTO } from "../dtos/IUserDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/model/user";

export class UserRepositoryInMemory implements IUserRepository {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create({ name, email }: ICreateUserDTO): Promise<void> {
    const user = {
      props: {
        name: name,
        email: email,
        isAdmin: false
      }
    }

    const createUser = User
      .create(user.props);

     this
      .repository
      .push(createUser);

  }

  async findOne(email: string): Promise<IUserDTO | undefined> {
    const findOneUser = this.repository.find(
      (user) => email === user.props.email
      );

    if (findOneUser === undefined) {
      return undefined;
    }

    const findOneUserRequest: IUserDTO = {
      props: {
        name: findOneUser.props.name,
        email: findOneUser.props.email
      },
      id: findOneUser.id
    }

    return findOneUserRequest;
  }

  async findAll(): Promise<IUserDTO[]> {
    const findAllUsers = this.repository;

    const users: IUserDTO[] = [];

    findAllUsers.forEach(async (user) => {
      const newUserRequestProps: IUserDTO = {
        props: {
          name: user.props.name,
          email: user.props.email
        },
        id: user.id
      }

       users
        .push(newUserRequestProps);
    });

    return users;
  }

  async findById(sub: string): Promise<IUserDTO | undefined> {
    const findUserById =  this.repository.find(
      (user) => user.id === sub
      );

    if (findUserById === undefined) {
      return undefined;
    }

    const { props, id } = findUserById;

    const findUserRequest: IUserDTO = {
      props: {
        name: props.name,
        email: props.email
      },
      id: id
    }

    return findUserRequest;
  }

  async findByName(name: string): Promise<IUserDTO | undefined> {
    const user = this.repository.find(usr => usr.props.name === name);
    return user;
  }
}