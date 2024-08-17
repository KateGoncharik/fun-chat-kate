import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";

export default function createDialogHeader(): Component {
  const userData = getSelectedUserData();
  if (!userData) {
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
  const [login, isActive] = userData.split(" ");

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
  const selectedUserData = getSelectedUserData();
  if (!selectedUserData) {
    throw new Error("Selected user expected");
  }
  const selectedUserLogin = selectedUserData.split(" ")[0];
  const selectedUserStatus = selectedUserData.split(" ")[1];

  if (!selectedUserLogin || !selectedUserStatus) {
    throw new Error("Invalid data");
  }
  const loginBlock = safeQuerySelector(".login-of-companion");
  loginBlock.innerHTML = selectedUserLogin;
  const statusBlock = safeQuerySelector(".status-of-companion");
  statusBlock.innerText = selectedUserStatus === "true" ? "online" : "offline";
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
