import { prisma } from "../Prisma/Client/Client.prisma";
import { Request, Response, NextFunction } from 'express';

const ensureUserIsAdmin = async (request: Request, response: Response, next: NextFunction) => {

  const { adminMail, secretKey } = request.body;

  const prismaClient = prisma;

  const findUserAdmin = await prismaClient
    .users
    .findUnique({ where: { email: adminMail } });
}