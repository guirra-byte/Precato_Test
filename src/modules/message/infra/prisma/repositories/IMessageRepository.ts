import { SubCases } from "../../../../sub/infra/model/sub";

export interface IMessageRequestPropsDTO {
  templateName: string,
  sendIf: string,
  expectSendDate: Date
}

export interface IMessageAllPropsRequestDTO {
  props: {
    id: number,
    template_name: string,
    description: string,
    expect_send_date: Date
  }
}

export interface IMessageRepository {
  create({ templateName, expectSendDate, sendIf }: IMessageRequestPropsDTO): Promise<void>
  findOne(actualCase: SubCases): Promise<IMessageAllPropsRequestDTO | undefined>
  findAll(): Promise<IMessageAllPropsRequestDTO[]>
  removeLastMessage(): Promise<void>
}