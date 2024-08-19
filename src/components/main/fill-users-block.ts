import type { UserAuthData } from "@/types";
import safeQuerySelector from "@/utils/safe-query-selector";
import clearBlock from "@/utils/clear-block";
import createUserBlock from "./user-block";

export function fillActiveUsers(data: UserAuthData[]): void {
  const usersBlock = safeQuerySelector(".active-users");
  clearBlock(usersBlock);
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

export function fillInactiveUsers(data: UserAuthData[]): void {
  const usersBlock = safeQuerySelector(".inactive-users");
  clearBlock(usersBlock);

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
