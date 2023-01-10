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
    msgCases: string
  }
}

export interface IMessageRepository {
  create({ templateName, expectSendDate, sendIf }: IMessageRequestPropsDTO): Promise<void>
  findOne(actualCase: string ): Promise<IMessageAllPropsRequestDTO | undefined>
  findById(id: string): Promise<IMessageAllPropsRequestDTO>
  findAll(): Promise<IMessageAllPropsRequestDTO[]>
  removeLastMessage(): Promise<void>
}
