import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";

export default function createDialogHeader(): Component {
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    return new Component(
      { className: "dialog-header" },
      new Component({
        className: "login-of-companion",
        text: " ",
      }),
      new Component({
        className: "status-of-companion",
        text: " ",
      }),
    );
  }
  const { login, isActive } = selectedUser;

  const loginOfCompanion = new Component({
    className: "login-of-companion",
    text: login,
  });
  const statusOfCompanion = new Component({
    className: "status-of-companion",
    text: isActive ? "online" : "offline",
  });
  statusOfCompanion.getNode().classList.add(isActive ? "online" : "offline");

  return new Component(
    {
      className: "dialog-header",
    },
    loginOfCompanion,
    statusOfCompanion,
  );
}

export function updateDialogHeader(): void {
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    throw new Error("Selected user expected");
  }

  const loginBlock = safeQuerySelector(".login-of-companion");
  loginBlock.innerHTML = selectedUser.login;
  const statusBlock = safeQuerySelector(".status-of-companion");
  statusBlock.innerText = selectedUser.isActive === true ? "online" : "offline";
}

export function updateSelectedUserStatus(isActive: boolean): void {
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    return;
  }
  const statusElement = safeQuerySelector(".status-of-companion");
  if (isActive) {
    statusElement.innerText = "online";
    statusElement.classList.remove("online");
    statusElement.classList.add("online");
    return;
  }
  statusElement.innerText = "offline";
  statusElement.classList.remove("online");
}
