import Component from "component";
import createNav from "./components/nav/nav";

export default function startApp(): void {
  const contentWrapper = new Component({ className: "content-wrapper" });
  const app = new Component({ className: "app" }, createNav(), contentWrapper);

  document.body.appendChild(app.getNode());
}
