import safeQuerySelector from "@/utils/safe-query-selector";

export default function clearInput(): void {
  safeQuerySelector<HTMLInputElement>(".message-input").value = "";
}
