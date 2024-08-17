import socket from "@/socket";

type Message = {
  to: string;
  text: string;
};

export default function sendMessage({ to, text }: Message): void {
  socket.send(
    JSON.stringify({
      id: "send-message",
      type: "MSG_SEND",
      payload: {
        message: {
          to,
          text,
        },
      },
    }),
  );
}
