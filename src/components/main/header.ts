import Component from "component";
import { AUTHORIZED_USER_KEY } from "@/storage";
import handleLogoutUser from "../auth/handle-logout-user";

export default function createHeader(): Component {
  const logoutButton = new Component({
    tag: "button",
    className: "logout",
    text: "LOGOUT",
  });

  logoutButton.addListener("click", () => {
    handleLogoutUser();
  });
  const user = sessionStorage.getItem(AUTHORIZED_USER_KEY);
  if (!user) {
    throw new Error("User expected");
  }
  const userLogin = new Component({
    className: "current-user-login",
    text: `Hello, ${JSON.parse(user).login}`,
  });

  const headerTitle = new Component({
    className: "header-title",
    text: "Fun-chat main page",
  });
  const header = new Component(
    { tag: "header", className: "main-header" },
    headerTitle,
    userLogin,
    logoutButton,
  );
  return header;
}
