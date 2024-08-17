import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import changeButtonAbility from "@/utils/change-button-ability";
import validateForm from "./validate";

function toggleVisibility(): void {
  const passwordInput = safeQuerySelector<HTMLInputElement>(".password-input");
  passwordInput.type = passwordInput.type === "text" ? "password" : "text";
}

function handleInputUpdate(): void {
  if (validateForm()) {
    changeButtonAbility("login", false);
  } else {
    changeButtonAbility("login", true);
  }
}

export default function createInputs(): Component[] {
  const nameInput = new Component({
    tag: "input",
    className: "name-input",
  });
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name");
  const nameLabel = new Component({
    tag: "label",
    className: "name-label",
    text: "name",
  });
  nameLabel.setAttribute("for", "name");
  const passwordInput = new Component({
    tag: "input",
    className: "password-input",
  });
  passwordInput.setAttribute("type", "password");
  nameInput.addListener("input", handleInputUpdate);
  passwordInput.addListener("input", handleInputUpdate);
  const toggleCheckbox = new Component({
    tag: "input",
    className: "toggle-visibility",
    text: "show password",
  });
  toggleCheckbox.setAttribute("type", "checkbox");
  toggleCheckbox.addListener("click", toggleVisibility);
  const passwordLabel = new Component({
    tag: "label",
    className: "password-label",
    text: "password",
  });
  passwordLabel.setAttribute("for", "name");
  return [nameLabel, nameInput, passwordLabel, passwordInput, toggleCheckbox];
}
