import logoutUserOnServer from "@/requests/logout-user-on-server";
import { removeAuthorizedUserFromLocalStorage } from "@/storage";
import changePage from "@/routing/change-page";
import { RouteName } from "@/constants";

export default function handleLogoutUser(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUserOnServer(JSON.parse(savedUser));
  removeAuthorizedUserFromLocalStorage();
  changePage(RouteName.Auth);
}
