import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";
import clearBlock from "@/utils/clear-block";
import getDialogHistoryForUser from "@/requests/request-dialog-history-with-user";
import createMessageBlock from "./message";

export default function createDialogHistoryBlock(): Component {
  const userData = getSelectedUserData();
  if (!userData) {
    return new Component(
      {
        className: "dialog-history-block",
      },
      new Component({
        tag: "h3",
        className: "no-user-selected-title",
        text: "No user selected. Choose anybody from the left bar.",
      }),
    );
  }

  return new Component({
    className: "dialog-history-block",
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
  const dialogHistoryBlock = safeQuerySelector(".dialog-history-block");
  clearBlock(dialogHistoryBlock);
  if (messages?.length) {
    messages.forEach((message) => {
      dialogHistoryBlock.appendChild(createMessageBlock(message).getNode());
    });
  } else {
    dialogHistoryBlock.appendChild(
      new Component({
        tag: "h3",
        className: "no-message-history-title",
        text: "Start this conversation!",
      }).getNode(),
    );
  }
  const { scrollHeight } = dialogHistoryBlock;
  dialogHistoryBlock.scrollTop = scrollHeight;
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
