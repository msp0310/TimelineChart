export default class Tooltip {
  private container: HTMLElement;
  public text: string;
  public x: number = 0;
  public y: number = 0;

  constructor() {
    this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    const margin = 15;
    this.container.style.left = this.x - (this.container.offsetWidth / 2) + "px";
    this.container.style.top = (this.y - (this.container.offsetHeight + margin) + "px");
  }

  public show(): void {
    if (this.container.innerHTML !== this.text) {
      this.container.innerHTML = this.text;
    }
    this.container.style.visibility = "visible";
  }

  public hide(): void {
    if (!this.container.innerHTML) {
      this.container.innerHTML = "";
    }
    this.container.style.visibility = "collapse";
  }

  private getOrCreateTooltipContainer(id: string): HTMLElement {
    let containerElement: HTMLElement = document.getElementById(id);
    if (containerElement) {
      return containerElement;
    }

    containerElement = document.createElement("div");
    containerElement.id = id;
    containerElement.style.width = "auto";
    containerElement.style.height = "auto";
    containerElement.style.position = "absolute";
    containerElement.style.border = "1px solid #ccc";
    containerElement.style.background = "#fff";
    containerElement.style.visibility = "collapse";
    containerElement.style.padding = "5px";
    containerElement.style.zIndex = '99999';
    document.getElementsByTagName("body")[0].appendChild(containerElement);
    return containerElement;
  }
}
