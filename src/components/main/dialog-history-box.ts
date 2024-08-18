import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";
import clearBox from "@/utils/clear-box";
import getDialogHistoryForUser from "@/requests/get-dialog-history-with-user";
import messageBox from "./message";

export default function createDialogHistoryBox(): Component {
  const userData = getSelectedUserData();
  if (!userData) {
    return new Component(
      {
        className: "dialog-history-box",
      },
      new Component({
        tag: "h3",
        className: "no-user-selected-title",
        text: "No user selected. Choose anybody from the left bar.",
      }),
    );
  }

  return new Component({
    className: "dialog-history-box",
    text: "Start this conversation!",
  });
}

type HistoryResponse = {
  id: string;
  type: "MSG_FROM_USER";
  payload: {
    messages: MessageSendResponse[];
  };
};

type MessageSendResponse = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export function fillDialogHistory(response: HistoryResponse): void {
  const dialogHistoryBox = safeQuerySelector(".dialog-history-box");
  clearBox(dialogHistoryBox);
  const { messages } = response.payload;
  if (messages?.length) {
    messages.forEach((message) => {
      dialogHistoryBox.appendChild(messageBox(message).getNode());
    });
  } else {
    dialogHistoryBox.appendChild(
      new Component({
        tag: "h3",
        className: "no-message-history-title",
        text: "Start this conversation!",
      }).getNode(),
    );
  }
  const { scrollHeight } = dialogHistoryBox;
  dialogHistoryBox.scrollTop = scrollHeight;
}

export function updateDialogHistory(receiver?: string): void {
  const selected = getSelectedUserData();
  if (!selected) {
    throw new Error("Selected user expected");
  }
  const login = selected.split(" ")[0];
  if (!login) {
    throw new Error("Invalid data");
  }
  if (receiver) {
    getDialogHistoryForUser(receiver);
  } else {
    getDialogHistoryForUser(login);
  }
}
