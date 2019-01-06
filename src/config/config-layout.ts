/**
 * Layout.
 */
export default class LayoutConfig {
  public padding: PaddingConfig;

  constructor(layout: any) {
    this.padding = (layout.padding != null ? layout.padding : new PaddingConfig(0, 0, 0, 0)) as PaddingConfig;
  }
}

export class PaddingConfig {
  constructor(
    public left: number = 0,
    public top: number = 0,
    public right: number = 0,
    public bottom: number = 0
  ) {}
}
