import { app } from "./app";

import { messagesRoutes } from "./Routes/Messages.routes";
import { userRoutes } from "./Routes/User.routes";

app.use(messagesRoutes);

app.use(userRoutes);

const PORT = 1106;

app.listen(PORT, () => {

  console
    .log("O Server já está rodando --- 💜 ✝ 🙌");
})