import { SubCases } from "../../model/sub"

export interface ISubAllPropsRequestDTO {
  id?: string,
  props: {
    subs_date?: Date,
    name: string,
    last_message?: number,
    active?: boolean,
    actualCase: SubCases
  }
}

export interface ISubRepository {
  create(name: string): Promise<void>
  findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined>
  findByEmail(email: string): Promise<ISubAllPropsRequestDTO | undefined>
  findAll(): Promise<ISubAllPropsRequestDTO[]>
  updateLastMessage(id: string, last_message: number): Promise<void>
  updateActiveProps(id: string): Promise<void>
}