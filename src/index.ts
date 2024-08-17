import "./assets/styles/style.css";
import { ResponseId, RouteName } from "@/constants";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import loginUser from "./requests/login";
import { getAuthorizedUser, getSelectedUserData } from "./storage";
import {
  fillActiveUsers,
  fillInactiveUsers,
} from "./components/main/fill-users-block";
import isCurrentLocation from "./utils/compare-location";
import getAllUsers from "./utils/get-all-users";
import { updateSelectedUserStatus } from "./components/main/dialog-header";
import type { UserData } from "./types";
import changePage from "./routing/change-page";
import getDialogHistory from "./requests/get-history";
import {
  fillDialogHistory,
  updateDialogHistory,
} from "./components/main/dialog-history-box";

startApp();

type Response = {
  id: string | null;
  type: string;
  payload: { users: [] };
};

function handleActiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillActiveUsers(users);
  const selectedUserData = getSelectedUserData();
  if (!selectedUserData) {
    return;
  }
  const selectedUserLogin = selectedUserData.split(" ")[0];
  const selectedUserIsActiveNow = users.filter(
    (user: UserData) => user.login === selectedUserLogin,
  );
  if (selectedUserIsActiveNow.length) {
    updateSelectedUserStatus(true);
  }
}

function handleInactiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillInactiveUsers(users);
  const selectedUserData = getSelectedUserData();
  if (!selectedUserData) {
    return;
  }
  const selectedUserLogin = selectedUserData.split(" ")[0];
  const selectedUserIsNotActiveNow = users.filter(
    (user: UserData) => user.login === selectedUserLogin,
  );
  if (selectedUserIsNotActiveNow.length) {
    updateSelectedUserStatus(false);
  }
}

function rename(receiver?: string): void {
  getAllUsers();
  if (receiver) {
    if (getSelectedUserData()) {
      updateDialogHistory(receiver);
    }
  }
}

socket.onmessage = (messageEvent: MessageEvent): void => {
  let messageData = messageEvent.data;
  try {
    messageData = JSON.parse(messageEvent.data);
  } catch (err) {
    throw new Error("Message data expected");
  }
  const messageId = messageData.id;
  if (messageId === ResponseId.Login) {
    changePage(RouteName.Main);
    getAllUsers();
  }
  if (messageId === ResponseId.Null && isCurrentLocation(RouteName.Main)) {
    if (
      messageData.payload.message?.from === getSelectedUserData()?.split(" ")[0]
    ) {
      rename(messageData.payload.message.from);
    } else {
      rename();
    }
  }
  if (messageId === ResponseId.Active && isCurrentLocation(RouteName.Main)) {
    handleActiveUsersOnMainUpdate(messageData);
  } else if (
    messageId === ResponseId.Inactive &&
    isCurrentLocation(RouteName.Main)
  ) {
    handleInactiveUsersOnMainUpdate(messageData);
  }
  if (messageId === "send-message") {
    updateDialogHistory();
  }
  if (messageId === ResponseId.Login && getSelectedUserData()) {
    updateDialogHistory();
  }
  if (messageId === "history") {
    fillDialogHistory(messageData);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (isCurrentLocation(RouteName.Main)) {
    getAllUsers();
    const selectedUserData = getSelectedUserData();
    if (!selectedUserData) {
      return;
    }
    const [login] = selectedUserData.split(" ");
    if (login) {
      getDialogHistory(login);
    }
  }
};

handleRouting();
window.onpopstate = (): void => {
  handleRouting();
};
