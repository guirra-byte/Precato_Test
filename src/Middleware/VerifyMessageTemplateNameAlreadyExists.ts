import { prisma } from "../Prisma/Client/Client.prisma";
import { Request, Response, NextFunction } from 'express';

const verifyMessageTemplateNameAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {

  const { template_name } = request.body;

  let repository: typeof prisma;
  repository = prisma;

  const findMessageTemplateName = await repository
    .messages
    .findUnique({ where: { template_name: template_name } });

  if (findMessageTemplateName) {

    console.log("Caiu no Condicional");

    return response
      .status(400)
      .json({ message: "This template name already in use" });
  }

  next();
}

export { verifyMessageTemplateNameAlreadyExists }