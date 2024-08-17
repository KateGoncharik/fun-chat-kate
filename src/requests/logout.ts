import socket from "@/socket";

import type { UserData } from "@/types";

export default function logoutUser(userData: UserData): void {
  const { login, password } = userData;
  socket.send(
    JSON.stringify({
      id: "logout",
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
