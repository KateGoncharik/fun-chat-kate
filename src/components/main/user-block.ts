import { saveSelectedUserData } from "@/storage";
import type { UserData } from "@/types";
import Component from "component";
import { updateDialogHeader } from "./dialog-header";
import {
  updateCraftMessageBox,
  clearInput,
} from "./dialog-craft-message-block";
import { updateDialogHistory } from "./dialog-history-box";

export default function createUserBlock({ login }: UserData): Component {
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
    saveSelectedUserData(
      event.target.textContent!,
      event.target.classList.contains("active"),
    );
    updateDialogHeader();
    updateDialogHistory();
    updateCraftMessageBox();
    clearInput();
  });
  return userBlock;
}
