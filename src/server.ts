import { app } from "./app";

import "express-async-errors";

import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';

import { Request, Response, NextFunction } from 'express';

import { messagesRoutes } from "./Routes/Messages.routes";
import { userRoutes } from "./Routes/User.routes";
import { subRoutes } from './Routes/Sub.routes';
import { AppError } from "./Errors/AppError";

// ---- API Documentation Route ----

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// ---- ** ----

// ---- Users Routes ----
app.use("/createUser", userRoutes);
app.use("/findOneUser", userRoutes);
app.use("/users", userRoutes);
app.use("/sessions", userRoutes);
// ---- ** ----

// ---- Subs Routes ----
app.use("/updateActiveProp", subRoutes);
app.use("/findOneSub", subRoutes);
app.use("/subs", subRoutes);
// ---- ** ----

// ---- Messages Routes ----
app.use("/createMessage", messagesRoutes);
app.use("/findOneMessage", messagesRoutes);
app.use("/messages", messagesRoutes);
app.use("/removeLastMessage", messagesRoutes);
app.use("/mail", messagesRoutes);
// ---- ** ----

// ---- Middleware para maior controle dos Errors Async ----
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

  if (error instanceof AppError) {

    return response
      .status(error.statusCode)
      .json({ message: `${error.message}` });
  }

  return response
    .status(500)
    .json({ message: `Internal server error` });

});
// ---- ** ----

const PORT = 1106;

app.listen(PORT, () => {

  console
    .log("O Server já está rodando --- 💜 ✝ 🙌");
});