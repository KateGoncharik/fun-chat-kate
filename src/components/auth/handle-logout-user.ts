import logoutUserOnServer from "@/requests/logout-user-on-server";
import changePage from "@/routing/change-page";
import { RouteName } from "@/constants";
import Storage from "@/storage";

export default function handleLogoutUser(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUserOnServer(JSON.parse(savedUser));
  Storage.removeAuthorizedUserFromLocalStorage();
  changePage(RouteName.Auth);
}
