import Component from "component";
import createHeader from "./header";
import createFooter from "./footer";
import createAllUsersBlock from "./all-users";
import createDialogWindow from "./dialog-window";

export default function createMainPage(): Component {
  const users = createAllUsersBlock();
  const mainPage = new Component(
    { className: "main-wrapper" },
    createHeader(),
    new Component({ className: "chat-wrapper" }, users, createDialogWindow()),
    createFooter(),
  );
  return mainPage;
}
