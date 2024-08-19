import { setSelectedUserData } from "@/storage";
import type { UserAuthData } from "@/types";
import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import { updateDialogHeader } from "./dialog-header";
import { updateSendMessageBlock } from "./dialog-send-message-block";
import { updateDialogHistory } from "./dialog-history-box";

export function clearInput(): void {
  safeQuerySelector<HTMLInputElement>(".message-input").value = "";
}

export default function createUserBlock({ login }: UserAuthData): Component {
  const userLogin = new Component({
    tag: "p",
    className: "user-login",
    text: login,
  });
  const userBlock = new Component({ className: "registered-user" }, userLogin);
  userLogin.addListener("click", (event) => {
    if (!event.target) {
      throw new Error("Target expected");
    }
    if (!(event.target instanceof HTMLElement)) {
      throw new Error("Wrong  event");
    }
    setSelectedUserData(
      event.target.textContent!,
      event.target.classList.contains("active"),
    );
    updateDialogHeader();
    updateDialogHistory();
    updateSendMessageBlock();
    clearInput();
  });
  return userBlock;
}
