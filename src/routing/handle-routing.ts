import clearBlock from "@/utils/clear-block";
import safeQuerySelector from "@/utils/safe-query-selector";
import { getAuthorizedUser } from "@/storage";
import { RouteName } from "@/constants";
import { updateDialogHistory } from "@/components/main/dialog-history-block";
import requestAllUsers from "@/requests/request-all-users";
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
    requestAllUsers();
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

  clearBlock(contentWrapper);
  contentWrapper.appendChild(getComponent().getNode());
}
