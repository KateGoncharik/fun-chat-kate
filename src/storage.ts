import type { UserAuthData } from "./types";

export const AUTHORIZED_USER_KEY = "authorized-user";
export const SELECTED_USER = "selected-user";

type User = {
  login: string;
  isActive: boolean;
};

export default class Storage {
  static setAuthorizedUser(userData: {
    login: string;
    password: string;
  }): void {
    sessionStorage.setItem(AUTHORIZED_USER_KEY, JSON.stringify(userData));
  }

  static removeAuthorizedUserFromLocalStorage(): void {
    sessionStorage.removeItem(AUTHORIZED_USER_KEY);
  }

  static getAuthorizedUser(): UserAuthData | null {
    const savedUser = sessionStorage.getItem(AUTHORIZED_USER_KEY);
    if (!savedUser) {
      return null;
    }
    return JSON.parse(savedUser);
  }

  static setSelectedUserData(login: string, isActive: boolean): void {
    sessionStorage.setItem(SELECTED_USER, JSON.stringify({ login, isActive }));
  }

  static getSelectedUserData(): User | null {
    const selectedUser = sessionStorage.getItem(SELECTED_USER);
    if (!selectedUser) {
      return null;
    }
    return JSON.parse(selectedUser);
  }
}
