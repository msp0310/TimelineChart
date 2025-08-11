export default class Tooltip {
    /**
     * Container
     */
    private container;
    /**
     * 表示文字列
     */
    text: string;
    /**
     * 表示位置 x
     */
    x: number;
    /**
     * 表示位置 y
     */
    y: number;
    constructor();
    setPosition(x: number, y: number): void;
    show(): void;
    hide(): void;
    private getOrCreateTooltipContainer;
}
