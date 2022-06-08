export interface ISubRequestPropsDTO {

  name: string
}

export interface ISubAllPropsRequestDTO {

  props: {

    sub_date?: Date
    name: string
    last_message?: number,
    active?: boolean
  },
  id?: string
}

export interface ISubRepository {

  create({ name }: ISubRequestPropsDTO): Promise<void>
  findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined>
  findAll(): Promise<ISubAllPropsRequestDTO[]>
  updateLastMessage(id: string, last_message: number): Promise<void>
  updateActiveProps(id: string): Promise<void>
}