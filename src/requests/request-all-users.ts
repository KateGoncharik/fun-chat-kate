import requestAllInactiveUsers from "@/requests/request-all-inactive-users";
import requestAllActiveUsers from "@/requests/request-all-active-users";

export default function requestAllUsers(): void {
  requestAllActiveUsers();
  requestAllInactiveUsers();
}
