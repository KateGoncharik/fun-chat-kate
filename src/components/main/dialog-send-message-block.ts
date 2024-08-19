import { getSelectedUserData } from "@/storage";
import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import handleSendMessage from "./handle-send-message";

function validateMessage(message: string): boolean {
  return message.length > 0;
}

export default function createSendMessageBlock(): Component {
  const messageInput = new Component({
    tag: "input",
    className: "message-input",
  });
  messageInput.setAttribute("type", "text");

  messageInput.setAttribute("placeholder", "Start typing your message..");

  const sendMessageButton = new Component({
    tag: "button",
    className: "send-message-button",
    text: "Send",
  });

  const selectedUser = getSelectedUserData();
  if (selectedUser) {
    sendMessageButton.addListener("click", () => {
      const input = safeQuerySelector<HTMLInputElement>(".message-input");
      if (validateMessage(input.value)) {
        handleSendMessage(selectedUser.login, input.value);
      }
    });
  } else {
    messageInput.setAttribute("disabled", "true");
    sendMessageButton.setAttribute("disabled", "true");
  }
  return new Component(
    {
      className: "send-message-block",
    },
    messageInput,
    sendMessageButton,
  );
}

export function updateSendMessageBlock(): void {
  const userData = getSelectedUserData();
  if (!userData) {
    throw new Error("Selected user expected");
  }
  const { login } = userData;

  safeQuerySelector(".message-input").removeAttribute("disabled");
  const sendMessageButton = safeQuerySelector<HTMLButtonElement>(
    ".send-message-button",
  );
  sendMessageButton.removeAttribute("disabled");
  sendMessageButton.addEventListener("click", () => {
    const input = safeQuerySelector<HTMLInputElement>(".message-input");

    if (validateMessage(input.value)) {
      handleSendMessage(login, input.value);
    }
  });
}
