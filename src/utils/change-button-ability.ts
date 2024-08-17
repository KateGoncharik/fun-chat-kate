import safeQuerySelector from "./safe-query-selector";

export default function changeButtonAbility(
  buttonClassName: string,
  buttonAbility: boolean,
): void {
  const button = safeQuerySelector<HTMLButtonElement>(`.${buttonClassName}`);
  button.disabled = buttonAbility;
}
