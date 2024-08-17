import Component from "component";
import handleLogout from "../auth/handle-logout";

export default function createHeader(): Component {
  const logoutButton = new Component({
    tag: "button",
    className: "logout",
    text: "LOGOUT",
  });

  logoutButton.addListener("click", () => {
    handleLogout();
  });
  const user = sessionStorage.getItem("authorized-user");
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
