import logoutUser from "@/requests/logout";
import { removeAuthorizedUser } from "@/storage";
import changePage from "@/routing/change-page";
import { RouteName } from "@/constants";

export default function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUser(JSON.parse(savedUser));
  removeAuthorizedUser();
  changePage(RouteName.Auth);
}
