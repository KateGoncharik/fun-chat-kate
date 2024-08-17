import socket from "@/socket";
import type { UserData } from "@/types";
import { ResponseId } from "@/constants";

export default function loginUser(userData: UserData): void {
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
