import Component from "component";
import createDialogHeader from "./dialog-header";
import createDialogHistoryBox from "./dialog-history-box";
import dialogCraftMessageBlock from "./dialog-craft-message-block";

export default function createDialogWindow(): Component {
  const dialogBox = createDialogHeader();
  return new Component(
    {
      className: "dialog-window",
    },
    dialogBox,
    createDialogHistoryBox(),
    dialogCraftMessageBlock(),
  );
}
