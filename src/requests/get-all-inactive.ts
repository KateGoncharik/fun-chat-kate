import socket from "@/socket";

export default function getAllInactiveUsers(): void {
  socket.send(
    JSON.stringify({
      id: "inactive",
      type: "USER_INACTIVE",
      payload: null,
    }),
  );
}
