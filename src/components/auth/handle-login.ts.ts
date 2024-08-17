import { saveAuthorizedUser } from "@/storage";
import loginUser from "@/requests/login";

import collectUserData from "./collect-user-data";
import validateForm from "./validate";

export default function handleLogin(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = collectUserData();
  saveAuthorizedUser(userData);

  loginUser(userData);
}
