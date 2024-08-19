import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";
import clearBox from "@/utils/clear-box";
import getDialogHistoryForUser from "@/requests/request-dialog-history-with-user";
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

export function fillDialogHistory({
  messages,
}: {
  messages: MessageSendResponse[];
}): void {
  const dialogHistoryBox = safeQuerySelector(".dialog-history-box");
  clearBox(dialogHistoryBox);
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
  const selectedUser = getSelectedUserData();
  if (!selectedUser) {
    throw new Error("Selected user expected");
  }

  if (receiver) {
    getDialogHistoryForUser(receiver);
  } else {
    getDialogHistoryForUser(selectedUser.login);
  }
}
