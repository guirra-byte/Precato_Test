import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserDTO } from "../../../dtos/IUserDTO";

export interface IUserRepository {
  create({ name, email }: ICreateUserDTO): Promise<void>
  findOne(email: string): Promise<IUserDTO | undefined>
  findByName(name: string): Promise<IUserDTO | undefined>
  findAll(): Promise<IUserDTO[]>
  findById(sub: string): Promise<IUserDTO | undefined>
}