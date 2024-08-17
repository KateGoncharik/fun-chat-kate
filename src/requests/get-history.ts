import socket from "@/socket";

export default function getDialogHistory(login: string): void {
  socket.send(
    JSON.stringify({
      id: "history",
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login,
        },
      },
    }),
  );
}
