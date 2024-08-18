import getAllActiveUsers from "@/requests/get-all-active-users";
import getAllInactiveUsers from "@/requests/get-all-inactive-users";

export default function getAllUsers(): void {
  getAllActiveUsers();
  getAllInactiveUsers();
}
