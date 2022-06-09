import { ISubAllPropsRequestDTO } from "../../Sub/Repository/ISubRepository"

export interface IMessageRequestPropsDTO {

  template_name: string
}


export interface IMessageAllPropsRequestDTO {

  props: {

    template_name: string,
    id: number,
  }

}

export interface IMessageRepository {

  create({ template_name }: IMessageRequestPropsDTO): Promise<void>
  findOne(template_name: string): Promise<IMessageAllPropsRequestDTO | undefined>
  findAll(): Promise<IMessageAllPropsRequestDTO[]>
  removeLastMessage(): Promise<void>
}