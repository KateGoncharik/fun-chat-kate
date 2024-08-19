import { getAuthorizedUser } from "@/storage";
import Component from "component";

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

function getFormattedTime(datetime: number): string {
  const time = new Date(datetime);
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  return `${year}-${month}-${date}`;
}

export default function createMessageBlock({
  datetime,
  from,
  id,
  status,
  text,
}: MessageSendResponse): Component {
  const messageStatus = new Component({
    className: "message-status",
    text: status.isReaded ? "read" : "not read",
  });

  const messageTime = new Component({
    className: "message-time",
    text: getFormattedTime(datetime),
  });
  const messageTextBlock = new Component({
    className: "message-text-block",
    text,
  });
  const messageBlock = new Component(
    { className: "message-block" },
    messageTextBlock,
    messageStatus,
    messageTime,
  );

  if (from === getAuthorizedUser()?.login) {
    messageBlock.getNode().classList.add("mine");
  } else {
    messageBlock.getNode().classList.add("his");
  }
  messageBlock.setAttribute("id", id);
  return messageBlock;
}
