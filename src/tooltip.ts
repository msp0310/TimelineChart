export default class Tooltip {
  /**
   * Container
   */
  private container: HTMLElement;

  /**
   * 表示文字列
   */
  public text!: string;

  /**
   * 表示位置 x
   */
  public x: number = 0;

  /**
   * 表示位置 y
   */
  public y: number = 0;

  constructor() {
    this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    const margin = 15;
    this.container.style.left = this.x - this.container.offsetWidth / 2 + "px";
    this.container.style.top =
      this.y - (this.container.offsetHeight + margin) + "px";
  }

    public show(): void {
    // XSS緩和: textContent を用い HTMLは解釈させない
      const raw = this.text || '';
      const escaped = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;');
      // 元々ユーザが書いた <br> は &lt;br&gt; にエスケープされるのでそれを本物へ戻す
      const withExplicitBr = escaped.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
      // '\n' を <br> に
      const formatted = withExplicitBr.replace(/\n/g, '<br>');
      if (this.container.innerHTML !== formatted) {
        this.container.innerHTML = formatted;
    }
    this.container.style.visibility = "visible";
  }

  public hide(): void {
    if (!this.container.textContent) {
      this.container.textContent = "";
    }
    this.container.style.visibility = "collapse";
  }

  private getOrCreateTooltipContainer(id: string): HTMLElement {
    let containerElement: HTMLElement | null = document.getElementById(id);
    if (containerElement) {
      return containerElement;
    }

    const created = document.createElement("div");
    created.id = id;
    created.style.width = "auto";
    created.style.height = "auto";
    created.style.position = "absolute";
    created.style.border = "1px solid #ccc";
    created.style.background = "#fff";
    created.style.visibility = "collapse";
    created.style.padding = "5px";
    created.style.zIndex = "99999";
    document.getElementsByTagName("body")[0].appendChild(created);
    return created;
  }
}
