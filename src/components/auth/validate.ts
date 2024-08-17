import safeQuerySelector from "@/utils/safe-query-selector";

export default function validateForm(): boolean {
  const nameInput = safeQuerySelector<HTMLInputElement>(".name-input");
  const passwordInput = safeQuerySelector<HTMLInputElement>(".password-input");
  const nameLength = nameInput.value.length;
  const passwordLength = passwordInput.value.length;
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(nameInput.value) || !regex.test(passwordInput.value)) {
    return false;
  }
  const validPassword = (): boolean => {
    if (nameLength < 1 || nameLength > 10) {
      return false;
    }
    if (passwordLength < 4 || passwordLength > 10) {
      return false;
    }
    return true;
  };
  if (nameInput.value && passwordInput.value) {
    return validPassword();
  }
  return false;
}
