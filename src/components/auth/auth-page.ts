import Component from "component";
import isCurrentLocation from "@/utils/compare-location";
import createInputs from "./auth-inputs";
import handleLogin from "./handle-login.ts";

export default function createAuthPage(): Component {
  const fieldSet = new Component(
    {
      tag: "fieldset",
      className: "fieldset",
      text: "Please fill the form to continue. Login - from 1 to 10 English letters, and password from 4 to 10 English letters",
    },
    ...createInputs(),
  );
  const loginButton = new Component({
    tag: "button",
    className: "login",
    text: "LOGIN",
  });
  loginButton.setAttribute("type", "submit");

  loginButton.addListener("click", (event) => {
    handleLogin(event);
  });

  const authForm = new Component(
    { tag: "form", className: "auth-form" },
    fieldSet,
    loginButton,
  );
  window.onkeydown = (e): void => {
    if (e.code === "Enter" && isCurrentLocation("auth")) {
      handleLogin(e);
    }
  };
  return new Component(
    {
      className: "auth-page",
    },
    authForm,
    new Component({ className: "errors" }),
  );
}
