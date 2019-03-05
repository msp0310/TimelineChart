/**
 * Layout.
 */
export default class LayoutConfig {
  public padding: PaddingConfig;

  constructor(layout: any) {
    const padding = (layout || {}).padding;
    this.padding = new PaddingConfig(
      padding.left,
      padding.top,
      padding.right,
      padding.bottom
    );
  }
}

export class PaddingConfig {
  public left: number;
  public top: number;
  public right: number;
  public bottom: number;
  constructor(
    left: number | string = 0,
    top: number | string = 0,
    right: number | string = 0,
    bottom: number | string = 0
  ) {
    this.left = typeof left == "string" ? parseInt(left || "0") : left;
    this.top = typeof top == "string" ? parseInt(top || "0") : top;
    this.right = typeof right == "string" ? parseInt(right || "0") : right;
    this.bottom = typeof bottom == "string" ? parseInt(bottom || "0") : bottom;
  }
}
