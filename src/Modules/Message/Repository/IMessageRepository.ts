import { ISubAllPropsRequestDTO } from "../../Sub/Repository/ISubRepository"

export interface IMessageRequestPropsDTO {

  template_name: string,
  expect_send_date: Date
}


export interface IMessageAllPropsRequestDTO {

  props: {

    template_name: string,
    id: number,
    expect_send_date: Date
  }

}

export interface IMessageRepository {

  create({ template_name, expect_send_date }: IMessageRequestPropsDTO): Promise<void>
  findOne(template_name: string): Promise<IMessageAllPropsRequestDTO | undefined>
  findAll(): Promise<IMessageAllPropsRequestDTO[]>
  removeLastMessage(): Promise<void>
}