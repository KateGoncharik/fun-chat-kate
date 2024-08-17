export default function safeQuerySelector<E extends HTMLElement>(
  selector: string,
  parent: Element | HTMLElement | Document = document,
): E {
  const elem = parent.querySelector<E>(selector);
  if (!elem) {
    throw new Error(`Error: element with selector ${selector} was not found`);
  }
  return elem;
}
