

export interface IUserRequestProps {

  name: string
  email: string
}

export interface IFindUserRequestProps {

  props: {

    name: string
    email: string
    sub_id?: string
  },
  id?: string
}

export interface IUserRepository {

  create({ name, email }: IUserRequestProps): Promise<void>
  findOne(email: string): Promise<IFindUserRequestProps | undefined>
  findAll(): Promise<IFindUserRequestProps[]>
  findById(sub: string): Promise<IFindUserRequestProps | undefined>
}