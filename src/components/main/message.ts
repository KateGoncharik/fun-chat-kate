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

export default function messageBox({
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
  const time = new Date(datetime);
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const messageTime = new Component({
    className: "message-time",
    text: `${year}-${month}-${date}`,
  });
  const messageTextBox = new Component({ className: "message-text-box", text });
  const box = new Component(
    { className: "message-box" },
    messageTextBox,
    messageStatus,
    messageTime,
  );

  if (from === getAuthorizedUser()?.login) {
    box.getNode().classList.add("mine");
  } else {
    box.getNode().classList.add("him");
  }
  box.setAttribute("id", id);
  return box;
}
