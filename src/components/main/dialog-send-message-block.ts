import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import Storage from "@/storage";
import handleSendMessage from "./handle-send-message";
import clearInput from "../../utils/clear-input";

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

  const selectedUser = Storage.getSelectedUserData();
  if (selectedUser) {
    sendMessageButton.addListener("click", () => {
      const input = safeQuerySelector<HTMLInputElement>(".message-input");
      if (validateMessage(input.value)) {
        handleSendMessage(selectedUser.login, input.value);
        clearInput();
      }
    });
    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        const input = safeQuerySelector<HTMLInputElement>(".message-input");
        if (validateMessage(input.value)) {
          handleSendMessage(selectedUser.login, input.value);
          clearInput();
        }
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
  const userData = Storage.getSelectedUserData();
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
