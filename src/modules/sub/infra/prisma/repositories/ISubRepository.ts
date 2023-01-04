import { ISubAllPropsRequestDTO } from "../../../dtos/ISubAllPropsRequestDTO";
import { IUpdateSubLastMessageDTO } from "../../../dtos/IUpdateSubLastMessage";

export interface ISubRepository {
  create(name: string): Promise<void>
  findOne(name: string): Promise<ISubAllPropsRequestDTO | undefined>
  findByEmail(email: string): Promise<ISubAllPropsRequestDTO | undefined>
  findAll(): Promise<ISubAllPropsRequestDTO[]>
  updateLastMessage(data: IUpdateSubLastMessageDTO): Promise<void>
  updateActiveProps(id: string): Promise<void>
}