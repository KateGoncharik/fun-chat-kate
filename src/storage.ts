import type { UserAuthData } from "./types";

export const AUTHORIZED_USER_KEY = "authorized-user";
export const SELECTED_USER = "selected-user";

function setAuthorizedUser(userData: {
  login: string;
  password: string;
}): void {
  sessionStorage.setItem(AUTHORIZED_USER_KEY, JSON.stringify(userData));
}

function removeAuthorizedUserFromLocalStorage(): void {
  sessionStorage.removeItem(AUTHORIZED_USER_KEY);
}

function getAuthorizedUser(): UserAuthData | null {
  const savedUser = sessionStorage.getItem(AUTHORIZED_USER_KEY);
  if (!savedUser) {
    return null;
  }
  return JSON.parse(savedUser);
}

function setSelectedUserData(login: string, isActive: boolean): void {
  sessionStorage.setItem(SELECTED_USER, JSON.stringify({ login, isActive }));
}

type User = {
  login: string;
  isActive: boolean;
};

function getSelectedUserData(): User | null {
  const selectedUser = sessionStorage.getItem(SELECTED_USER);
  if (!selectedUser) {
    return null;
  }
  return JSON.parse(selectedUser);
}

export {
  setAuthorizedUser,
  removeAuthorizedUserFromLocalStorage,
  getAuthorizedUser,
  setSelectedUserData,
  getSelectedUserData,
};
