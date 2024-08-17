import type { UserData } from "@/types";
import safeQuerySelector from "@/utils/safe-query-selector";
import clearBox from "@/utils/clear-box";
import createUserBlock from "./user-block";

export function fillActiveUsers(data: UserData[]): void {
  const usersBlock = safeQuerySelector(".active-users");
  clearBox(usersBlock);
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    throw new Error("User expected");
  }
  data.forEach((user) => {
    if (user.login !== JSON.parse(savedUser).login) {
      const userBlockComponent = createUserBlock(user);
      userBlockComponent
        .getChildren()
        .every((userLogin) => userLogin.getNode().classList.add("active"));
      const userBlock = userBlockComponent.getNode();

      userBlock.classList.add("active-user");
      usersBlock.appendChild(userBlock);
    }
  });
}

export function fillInactiveUsers(data: UserData[]): void {
  const usersBlock = safeQuerySelector(".inactive-users");
  clearBox(usersBlock);

  data.forEach((user) => {
    const userBlockComponent = createUserBlock(user);
    userBlockComponent
      .getChildren()
      .every((userLogin) => userLogin.getNode().classList.add("inactive"));
    const userBlock = userBlockComponent.getNode();
    userBlock.classList.add("inactive-user");
    usersBlock.appendChild(userBlock);
  });
}
