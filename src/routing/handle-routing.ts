import clearBox from "@/utils/clear-box";
import safeQuerySelector from "@/utils/safe-query-selector";
import getAllUsers from "@/requests/get-all-users";
import { getAuthorizedUser } from "@/storage";
import { RouteName } from "@/constants";
import { updateDialogHistory } from "@/components/main/dialog-history-box";
import routes from "./routes";
import changePage from "./change-page";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1);
  if (location.length === 0) {
    location = RouteName.Auth;
    changePage(RouteName.Auth);
  }
  if (getAuthorizedUser() && location === RouteName.Auth) {
    location = RouteName.Main;
    changePage(RouteName.Main);
    getAllUsers();
    updateDialogHistory();
  }

  if (!getAuthorizedUser() && location === RouteName.Main) {
    location = RouteName.Auth;
    changePage(RouteName.Auth);
  }
  const route = routes[location] || routes[RouteName.NotFound];

  if (!route) {
    return;
  }

  const { getComponent, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(getComponent().getNode());
}
