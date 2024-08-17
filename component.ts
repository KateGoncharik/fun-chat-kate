export default class Component {
  private children: Array<Component> = [];

  private node: HTMLElement;

  constructor(
    { tag = "div", className = "", text = "" },
    ...children: Array<Component>
  ) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this.node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  append(child: Component): void {
    this.children.push(child);

    this.node.append(child.getNode());
  }

  appendChildren(children: Component[]): void {
    children.forEach((el) => {
      this.append(el);
    });
  }

  getNode(): HTMLElement {
    return this.node;
  }

  getChildren(): Array<Component> {
    return this.children;
  }

  setTextContent(content: string): void {
    this.node.textContent = content;
  }

  setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  addListener(event: string, listener: EventListener, options = false): void {
    this.node.addEventListener(event, listener, options);
  }

  removeListener(
    event: string,
    listener: EventListener,
    options = false,
  ): void {
    this.node.removeEventListener(event, listener, options);
  }

  destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }
}
