import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { IMessageRepository } from "../../infra/prisma/repositories/IMessageRepository";

export class CreateMessageUseCase {

  constructor(
    private messageRepository: IMessageRepository,
    private dateProvider: IDateProvider) { }

  async execute(template_name: string, expect_send_date: Date): Promise<void> {

    //Constante verificação da Data atual;

    //Verificação deve acontecer até que a data determinada 
    //seja igual a expect_return_date; 

    //Verificação se na Data atual possui messages programadas;
    //Então podemos realizar o envio das messages;

    await this
      .messageRepository
      .create({ template_name, expect_send_date });
  }
}