import Component from "component";
import createHeader from "../components/main/header";
import createFooter from "../components/main/footer";
import createAllUsersBlock from "../components/main/all-users";
import createDialogWindow from "../components/main/dialog-window";

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
