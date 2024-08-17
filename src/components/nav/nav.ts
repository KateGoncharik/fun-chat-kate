import Component from "component";
import { RouteName } from "@/constants";
import changePage from "../../routing/change-page";

export default function createNav(): Component {
  const aboutPageButton = new Component({
    tag: "button",
    className: "about",
    text: "ABOUT",
  });
  aboutPageButton.addListener("click", () => changePage(RouteName.About));
  const authPageButton = new Component({
    tag: "button",
    className: "auth",
    text: "AUTH",
  });
  authPageButton.addListener("click", () => changePage(RouteName.Auth));

  return new Component(
    { tag: "nav", className: "nav" },
    aboutPageButton,
    authPageButton,
  );
}
