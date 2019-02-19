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
    this.container.style.left = this.x + "px";
    this.container.style.top = this.y + "px";
  }

  public show(): void {
    this.container.innerHTML = this.text;
    this.container.style.visibility = "visible";
  }

  public hide(): void {
    this.container.innerHTML = "";
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
    document.getElementsByTagName("body")[0].appendChild(containerElement);
    return containerElement;
  }
}
