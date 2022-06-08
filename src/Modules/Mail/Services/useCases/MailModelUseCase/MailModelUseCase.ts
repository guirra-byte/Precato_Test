import { transport } from "../../../Config/Mail.config";

export class MailModelUseCase {

  constructor(private mailtrapService: typeof transport) { }

  async execute(title: string, description: string, to: string, from: string) {

    const runMailSender = async () => {

      const sendMail = await this.mailtrapService.sendMail({

        text: description,
        subject: title,
        from: `<${from}>`,
        to: [`${to}`],
        html: `
        <h1 style="color:#003566";>${title}</h1>
        <article>
          <p>${description}</p>
          <h3>Olá, ${to}, esse recado é rápido, mas muito importante!

          Hoje vamos liberar a mais importante informação sobre a sua formalização de pagamento;
          
          Nós vamos enviá-lo, por email, no dia 15/06. Mas, só para quem acertar, no mínimo, 7 de 10 questões. Acesse o QUIZ clicando aqui!
        <h3/>
          <h1>Na maioria das vezes, a diferença entre vencer e perder consiste em não desistir. - Walt Disney --- ✌😎✝️</h1>
        </article>`
      });

      return sendMail;
    };

    runMailSender();
  }
}
