import { SubCases } from "../../../../sub/infra/model/sub";

export interface IMessageRequestPropsDTO {
  templateName: string,
  sendIf: string,
  expectSendDate: Date
}

export interface IMessageAllPropsRequestDTO {
  props: {
    id: string,
    templateName: string,
    description: string,
    expectSendDate: Date,
    msgCases: SubCases
  }
}

export interface IMessageRepository {
  create({ templateName, expectSendDate, sendIf }: IMessageRequestPropsDTO): Promise<void>
  findOne(actualCase: SubCases): Promise<IMessageAllPropsRequestDTO | undefined>
  findById(id: string): Promise<IMessageAllPropsRequestDTO>
  findAll(): Promise<IMessageAllPropsRequestDTO[]>
  removeLastMessage(): Promise<void>
}