import socket from "@/socket";

export default function requestAllInactiveUsers(): void {
  socket.send(
    JSON.stringify({
      id: "inactive",
      type: "USER_INACTIVE",
      payload: null,
    }),
  );
}
