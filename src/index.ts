import "./assets/styles/style.css";
import { ResponseId, RouteName } from "@/constants";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import loginUserOnServer from "./requests/login-user-on-server";
import { getAuthorizedUser, getSelectedUserData } from "./storage";
import {
  fillActiveUsers,
  fillInactiveUsers,
} from "./components/main/fill-users-block";
import isCurrentLocation from "./utils/compare-location";
import requestAllUsers from "./requests/request-all-users";
import { updateSelectedUserStatus } from "./components/main/dialog-header";
import type { UserAuthData } from "./types";
import changePage from "./routing/change-page";
import requestDialogHistoryWithUser from "./requests/request-dialog-history-with-user";
import {
  fillDialogHistory,
  updateDialogHistory,
} from "./components/main/dialog-history-block";

startApp();

type Response = {
  id: string | null;
  type: string;
  payload: { users: [] };
};

function handleActiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillActiveUsers(users);
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    return;
  }
  const { login } = selectedUser;
  const selectedUserIsActiveNow = users.filter(
    (user: UserAuthData) => user.login === login,
  );
  if (selectedUserIsActiveNow.length) {
    updateSelectedUserStatus(true);
  }
}

function handleInactiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillInactiveUsers(users);
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    return;
  }
  const { login } = selectedUser;
  const selectedUserIsNotActiveNow = users.filter(
    (user: UserAuthData) => user.login === login,
  );
  if (selectedUserIsNotActiveNow.length) {
    updateSelectedUserStatus(false);
  }
}

function requestUsersOrUpdateDialogHistory(receiver?: string): void {
  requestAllUsers();
  if (receiver && getSelectedUserData()) {
    updateDialogHistory(receiver);
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
    requestAllUsers();
  }
  if (messageId === ResponseId.Null && isCurrentLocation(RouteName.Main)) {
    const selectedUser = getSelectedUserData();
    if (
      selectedUser &&
      messageData.payload.message?.from === selectedUser.login
    ) {
      requestUsersOrUpdateDialogHistory(messageData.payload.message.from);
    } else {
      requestUsersOrUpdateDialogHistory();
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
  if (messageId === "history" && isCurrentLocation(RouteName.Main)) {
    fillDialogHistory(messageData.payload);
  }
};

function handleOpenConnectionOnMain(): void {
  requestAllUsers();

  const selectedUser = getSelectedUserData();
  if (selectedUser) {
    requestDialogHistoryWithUser(selectedUser.login);
  }
}

socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUserOnServer(user);
  }
  if (isCurrentLocation(RouteName.Main)) {
    handleOpenConnectionOnMain();
  }
};

handleRouting();
window.onpopstate = (): void => {
  handleRouting();
};
