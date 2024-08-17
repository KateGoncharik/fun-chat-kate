import socket from "@/socket";

export default function getAllActiveUsers(): void {
  socket.send(
    JSON.stringify({
      id: "active",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
}
