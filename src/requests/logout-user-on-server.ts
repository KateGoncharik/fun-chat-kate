import { ResponseId } from "@/constants";
import socket from "@/socket";

import type { UserAuthData } from "@/types";

export default function logoutUserOnServer(userData: UserAuthData): void {
  const { login, password } = userData;
  socket.send(
    JSON.stringify({
      id: ResponseId.Login,
      type: "USER_LOGOUT",
      payload: {
        user: {
          login,
          password,
        },
      },
    }),
  );
}
