import { app } from "./app";

import { messagesRoutes } from "./Routes/Messages.routes";
import { userRoutes } from "./Routes/User.routes";
import { subRoutes } from './Routes/Sub.routes';

// ---- User Routes ----
app.use("/createUser", userRoutes);
app.use("/findOneUser", userRoutes);
app.use("/users", userRoutes);
app.use("/sessions", userRoutes);
app.use("/updateActiveProp", subRoutes);
// ---- ** ----

// ---- Sub Routes ----
app.use("/findOneSub", subRoutes);
app.use("/subs", subRoutes);
// ---- ** ----

// ---- Messages Routes ----
app.use("/createMessage", messagesRoutes);
app.use("/findOneMessage", messagesRoutes);
app.use("/messages", messagesRoutes);
app.use("/removeLastMessage", messagesRoutes);
// ---- ** ----

const PORT = 1106;

app.listen(PORT, () => {

  console
    .log("O Server já está rodando --- 💜 ✝ 🙌");
});