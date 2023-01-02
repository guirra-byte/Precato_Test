import { Request, Response, NextFunction } from 'express';
import { MessageRepository } from '../../../modules/Message/Repository/Implementation/MessageRepository';


const verifyMessageTemplateNameAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {

  const { template_name } = request.body;

  const repository = MessageRepository
    .getInstance();

  const findMessageTemplateName = await repository
    .findOne(template_name);

  if (findMessageTemplateName === undefined) {

    next();

  } else {

    return response
      .status(400)
      .json({ message: "This template name already in use" });
  }

}

export { verifyMessageTemplateNameAlreadyExists }