import Component from "component";
import createDialogHeader from "./dialog-header";
import createDialogHistoryBlock from "./dialog-history-block";
import createSendMessageBlock from "./dialog-send-message-block";

export default function createDialogWindow(): Component {
  const dialogHeader = createDialogHeader();
  return new Component(
    {
      className: "dialog-window",
    },
    dialogHeader,
    createDialogHistoryBlock(),
    createSendMessageBlock(),
  );
}
