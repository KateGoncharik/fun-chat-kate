import socket from "@/socket";
import type { UserAuthData } from "@/types";
import { ResponseId } from "@/constants";

export default function loginUserOnServer(userData: UserAuthData): void {
  const { login, password } = userData;
  socket.send(
    JSON.stringify({
      id: ResponseId.Login,
      type: "USER_LOGIN",
      payload: {
        user: {
          login,
          password,
        },
      },
    }),
  );
}
