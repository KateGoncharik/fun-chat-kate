import { setAuthorizedUser } from "@/storage";
import loginUserOnServer from "@/requests/login-user-on-server";

import collectUserData from "./collect-user-data";
import validateForm from "./validate";

export default function handleLoginUser(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = collectUserData();
  setAuthorizedUser(userData);
  loginUserOnServer(userData);
}
