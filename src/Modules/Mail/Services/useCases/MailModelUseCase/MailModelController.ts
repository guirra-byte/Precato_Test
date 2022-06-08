// import { Request, Response } from 'express';
// import { MailModelUseCase } from './MailModelUseCase';

// export class MailModelController {

//   constructor(private mailModelUseCase: MailModelUseCase) { }

//   async handle(request: Request, response: Response) {

//     const { title, description, from, to } = request.body;

//     try {

//       const sendMail = await this.mailModelUseCase.execute(title, description, from, to);
//     }
//   }
// }