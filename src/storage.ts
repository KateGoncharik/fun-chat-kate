import type { UserData } from "./types";

function saveAuthorizedUser(userData: {
  login: string;
  password: string;
}): void {
  sessionStorage.setItem("authorized-user", JSON.stringify(userData));
}

function removeAuthorizedUser(): void {
  sessionStorage.removeItem("authorized-user");
}

function getAuthorizedUser(): UserData | null {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return null;
  }
  return JSON.parse(savedUser);
}

function saveSelectedUserData(login: string, isActive: boolean): void {
  sessionStorage.setItem("selected-user", `${login} ${isActive}`);
}

function getSelectedUserData(): string | null {
  const selectedUser = sessionStorage.getItem("selected-user");
  if (!selectedUser) {
    return null;
  }
  return selectedUser;
}

export {
  saveAuthorizedUser,
  removeAuthorizedUser,
  getAuthorizedUser,
  saveSelectedUserData,
  getSelectedUserData,
};
