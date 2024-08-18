import Component from "component";
import isCurrentLocation from "@/utils/compare-location";
import handleLoginUser from "@/components/auth/handle-login-user.ts";
import createInputs from "@/components/auth/auth-inputs";

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
    handleLoginUser(event);
  });

  const authForm = new Component(
    { tag: "form", className: "auth-form" },
    fieldSet,
    loginButton,
  );
  window.onkeydown = (e): void => {
    if (e.code === "Enter" && isCurrentLocation("auth")) {
      handleLoginUser(e);
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
