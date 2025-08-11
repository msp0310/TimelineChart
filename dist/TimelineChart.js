/*!
 * TimelineChart v0.1.4
 * (c) 2025 Sawada Makoto.
 * Released under the MIT License
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TimelineChart = factory());
})(this, (function () { 'use strict';

    /** Lightweight TimeSpan (minutes precision) */
    class TimeSpan {
        constructor(totalMinutes) {
            this._minutes = totalMinutes;
        }
        static fromHoursMinutes(h, m) {
            return new TimeSpan(h * 60 + m);
        }
        static between(start, end) {
            return new TimeSpan(Math.max(0, end.getTime() - start.getTime()) / 60000);
        }
        get minutes() {
            return this._minutes;
        }
        get hours() {
            return Math.floor(this._minutes / 60);
        }
    }
    /** Minimal DateTime wrapper */
    class DateTime {
        constructor(d) {
            this.date = d;
        }
        static from(date) {
            return new DateTime(new Date(date.getTime()));
        }
        static parseHM(hm) {
            const parts = hm.split(":");
            const h = parseInt(parts[0] || "0", 10);
            const m = parseInt(parts[1] || "0", 10);
            const base = DateTime.today.toDate();
            const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0);
            return new DateTime(d);
        }
        static fromString(raw) {
            // simple delegate to helper-like logic (HH:mm only here)
            return DateTime.parseHM(raw);
        }
        addHours(h) {
            const d = new Date(this.date.getTime());
            d.setHours(d.getHours() + h);
            return new DateTime(d);
        }
        addMinutes(m) {
            const d = new Date(this.date.getTime());
            d.setMinutes(d.getMinutes() + m);
            return new DateTime(d);
        }
        compareTo(other) {
            return this.getTime() - other.getTime();
        }
        getTime() {
            return this.date.getTime();
        }
        toTimeStamp() {
            return {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1,
                day: this.date.getDate(),
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
            };
        }
        static between(a, b) {
            return TimeSpan.between(a, b);
        }
        toDate() {
            return new Date(this.date.getTime());
        }
    }
    DateTime.today = new DateTime(new Date(new Date().setHours(0, 0, 0, 0)));

    class DateTimeHelper {
        /**
         * Parse string to DateTime.
         * Supported formats:
         *  - HH:mm
         *  - YYYY/MM/DD HH:mm
         *  - YYYY-MM-DD HH:mm
         *  - ISO 8601 (YYYY-MM-DDTHH:mm[:ss])
         */
        static parse(dateString) {
            if (!dateString)
                return DateTime.parseHM("00:00");
            const raw = dateString.trim();
            // ISO 8601
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?/.test(raw)) {
                const d = new Date(raw);
                return DateTime.from(d);
            }
            // Split date & time
            const parts = raw.split(/\s+/);
            if (parts.length === 1 && /^\d{1,2}:\d{2}$/.test(parts[0])) {
                return DateTime.parseHM(parts[0]);
            }
            if (parts.length >= 2) {
                const datePart = parts[0];
                const timePart = parts[1];
                const dateMatch = datePart.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
                const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})$/);
                if (dateMatch && timeMatch) {
                    const y = parseInt(dateMatch[1], 10);
                    const m = parseInt(dateMatch[2], 10) - 1;
                    const d = parseInt(dateMatch[3], 10);
                    const hh = parseInt(timeMatch[1], 10);
                    const mm = parseInt(timeMatch[2], 10);
                    return DateTime.from(new Date(y, m, d, hh, mm, 0, 0));
                }
            }
            // fallback HH:mm
            return DateTime.parseHM(raw);
        }
    }

    /**
     * 設定.
     */
    class Config {
        /**
         * Constructor
         * @param config Config
         */
        constructor(config) {
            config = config || {};
            this.borderColor = config.borderColor || "#000";
            this.borderWidth = Number(config.borderWidth || 1);
            this.backgroundColor = config.backgroundColor || "transparent";
            this.tooltip = config.tooltip;
            this.layout = LayoutConfig.from(config.layout || {});
            this.time = TimeConfig.from(config.time || {});
            this.label = LabelConfig.from(config.label || {});
            this.hourBand = HourBandConfig.from(config.hourBand || {});
        }
    }
    /**
     * 時間に関する設定
     */
    class TimeConfig {
        /**
         * 合計(分)
         */
        get totalMinutes() {
            return DateTime.between(this.start, this.end).minutes;
        }
        static from(config) {
            config = config || {};
            const timeConfig = new TimeConfig();
            timeConfig.start = DateTimeHelper.parse(config.start || "00:00");
            timeConfig.end = DateTimeHelper.parse(config.end || "24:00");
            return timeConfig;
        }
    }
    /**
     * ラベルに関する設定
     */
    class LabelConfig {
        static from(config) {
            const labelConfig = new LabelConfig();
            labelConfig.fontFamily = config.fontFamily || "メイリオ";
            labelConfig.fontSize = config.fontSize || "14px";
            labelConfig.showLabel = config.showLabel || false;
            labelConfig.minWidthForText = Number(config.minWidthForText || 20); // 20px 未満は読めないので非表示
            labelConfig.useEllipsis =
                config.useEllipsis !== undefined ? !!config.useEllipsis : true;
            labelConfig.wrap = !!config.wrap;
            labelConfig.maxLines =
                config.maxLines !== undefined && config.maxLines !== null
                    ? Number(config.maxLines)
                    : undefined;
            labelConfig.lineHeight = Number(config.lineHeight || 1.2);
            labelConfig.autoContrast = config.autoContrast !== undefined ? !!config.autoContrast : true;
            labelConfig.contrastThreshold = Number(config.contrastThreshold !== undefined ? config.contrastThreshold : 140); // 元の 140 に戻す
            return labelConfig;
        }
    }
    /**
     * レイアウトに関する設定
     */
    class LayoutConfig {
        static from(layout) {
            const padding = layout.padding || {};
            const config = new LayoutConfig();
            config.padding = PaddingConfig.from(padding.left, padding.top, padding.right, padding.bottom);
            return config;
        }
    }
    /**
     * 時間帯(時間)バンド設定
     */
    class HourBandConfig {
        static from(config) {
            const c = new HourBandConfig();
            c.show = !!config.show;
            c.only = !!config.only;
            c.placement = config.placement === "top" ? "top" : "bottom";
            c.height = Number(config.height || 20);
            c.fontSize = config.fontSize || "10px";
            c.fontFamily = config.fontFamily || "メイリオ";
            c.color = config.color || "#000";
            c.lineColor = config.lineColor || "#ccc";
            c.showSeparators =
                config.showSeparators !== undefined ? !!config.showSeparators : true;
            c.alternateFill = config.alternateFill; // 例: 'rgba(0,0,0,0.03)'
            return c;
        }
    }
    /**
     * Paddingの設定
     */
    class PaddingConfig {
        get x() {
            return this.top + this.bottom;
        }
        get y() {
            return this.left + this.right;
        }
        static from(left, top, right, bottom) {
            const paddingConfig = new PaddingConfig();
            paddingConfig.left = parseInt(left || "0");
            paddingConfig.top = parseInt(top || "0");
            paddingConfig.right = parseInt(right || "0");
            paddingConfig.bottom = parseInt(bottom || "0");
            return paddingConfig;
        }
    }

    /**
     * Time Unit Element.
     */
    class TimeUnitElement {
        constructor(startTime, endTime, oneMinuteWidth, color = "#fff", label) {
            /**
             * 色
             */
            this.color = "#fff";
            this.startTime = startTime;
            this.endTime = endTime;
            this.oneMinuteWidth = oneMinuteWidth;
            this.color = color;
            this.label = label;
        }
        get totalMinutes() {
            return DateTime.between(this.startTime, this.endTime).minutes;
        }
        get startTimeText() {
            return this.getDateTimeText(this.startTime);
        }
        get endTimeText() {
            return this.getDateTimeText(this.endTime);
        }
        get width() {
            return this.oneMinuteWidth * this.totalMinutes;
        }
        getDateTimeText(date) {
            const timestamp = date.toTimeStamp();
            const zeroPadding = (num, length) => ("0000000000" + num).slice(-2);
            return `${timestamp.year}/${timestamp.month}/${timestamp.day} ${timestamp.hour}:${zeroPadding(timestamp.minute)}`;
        }
    }

    class Tooltip {
        constructor() {
            /**
             * 表示位置 x
             */
            this.x = 0;
            /**
             * 表示位置 y
             */
            this.y = 0;
            this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
            const margin = 15;
            this.container.style.left = this.x - this.container.offsetWidth / 2 + "px";
            this.container.style.top =
                this.y - (this.container.offsetHeight + margin) + "px";
        }
        show() {
            this.container.innerHTML = this.text;
            this.container.style.visibility = "visible";
        }
        hide() {
            if (!this.container.textContent) {
                this.container.textContent = "";
            }
            this.container.style.visibility = "collapse";
        }
        getOrCreateTooltipContainer(id) {
            let containerElement = document.getElementById(id);
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

    /**
     * Timeline Chart.
     *
     * (C) Sawada Makoto | MIT License
     */
    class TimelineChart {
        // リサイズ時の再描画は無効化したためハンドラ類は撤去
        /**
         * 合計（分）
         */
        get totalMinutes() {
            return this.config.time.totalMinutes;
        }
        /**
         * 1分当たりの幅
         */
        get oneMinuteWidth() {
            return this.drawableWidth / this.totalMinutes;
        }
        /**
         * Canvasの幅
         */
        get elementWidth() {
            return this.element.clientWidth;
        }
        /**
         * Canvasの高さ
         */
        get elementHeight() {
            return this.element.clientHeight;
        }
        /**
         * 描画可能な幅
         * (ボーダー・パディングを除く)
         */
        get drawableWidth() {
            return (this.elementWidth -
                this.config.borderWidth -
                (this.config.layout.padding.left + this.config.layout.padding.right));
        }
        /**
         * 描画可能な高さ
         */
        get drawableHeight() {
            return this.elementHeight;
        }
        /** 時間帯バンド高さ */
        get hourBandHeight() {
            var _a;
            return ((_a = this.config.hourBand) === null || _a === void 0 ? void 0 : _a.show) ? this.config.hourBand.height : 0;
        }
        /** ユニット描画領域の上端オフセット */
        get unitsTopOffset() {
            var _a;
            if (!((_a = this.config.hourBand) === null || _a === void 0 ? void 0 : _a.show))
                return 0;
            return this.config.hourBand.placement === "top"
                ? this.config.hourBand.height
                : 0;
        }
        /** ユニット描画領域高さ */
        get unitsDrawableHeight() {
            var _a;
            if (!((_a = this.config.hourBand) === null || _a === void 0 ? void 0 : _a.show))
                return this.drawableHeight;
            return this.drawableHeight - this.config.hourBand.height;
        }
        constructor(element, obj) {
            /**
             * バイナリサーチ用: 各ユニット開始分(開始境界からの経過分)
             */
            this.startMinutesArray = [];
            this.element = element;
            const ctx = this.element.getContext("2d");
            if (!ctx) {
                throw new Error("2D canvas context を取得できませんでした");
            }
            this.canvas = ctx;
            this.tooltip = new Tooltip();
            this.config = new Config((obj === null || obj === void 0 ? void 0 : obj.config) || {});
            // 初回のみ DPI を反映 (リサイズ時の再描画は行わない)
            const dpr = window.devicePixelRatio || 1;
            const rect = this.element.getBoundingClientRect();
            if (rect.width && rect.height) {
                // 以前のインスタンスで scale が残っている可能性があるため一旦リセット
                try {
                    this.canvas.setTransform(1, 0, 0, 1, 0, 0);
                }
                catch { }
                this.element.width = Math.max(1, Math.round(rect.width * dpr));
                this.element.height = Math.max(1, Math.round(rect.height * dpr));
                if (dpr !== 1) {
                    this.canvas.scale(dpr, dpr);
                }
            }
            // generate time units with validation / clipping
            const startBoundary = this.config.time.start;
            const endBoundary = this.config.time.end;
            this.timeUnits = [];
            ((obj === null || obj === void 0 ? void 0 : obj.data) || []).forEach((unit, index) => {
                const rawStart = DateTimeHelper.parse(unit.startTime);
                const rawEnd = DateTimeHelper.parse(unit.endTime);
                // skip invalid
                if (!rawStart || !rawEnd || rawEnd.compareTo(rawStart) <= 0) {
                    // 無効ユニットは無視
                    return;
                }
                // クリッピング
                let clippedStart = rawStart.compareTo(startBoundary) < 0 ? startBoundary : rawStart;
                let clippedEnd = rawEnd.compareTo(endBoundary) > 0 ? endBoundary : rawEnd;
                if (clippedEnd.compareTo(clippedStart) <= 0) {
                    return; // 完全に範囲外
                }
                const timeUnit = new TimeUnitElement(clippedStart, clippedEnd, this.oneMinuteWidth, unit.color, unit.label);
                // 0分要素はスキップ
                if (timeUnit.totalMinutes === 0)
                    return;
                this.timeUnits.push(timeUnit);
            });
            // start 時刻でソート
            this.timeUnits.sort((a, b) => a.startTime.compareTo(b.startTime));
            this.rebuildStartMinutesArray();
            this.Initialize();
            // Attach Events (参照保持で destroy 時に解除可能に)
            this.mouseMoveHandler = (ev) => this.onMouseMove(this, ev);
            this.mouseOutHandler = (ev) => this.onMouseOut(this, ev);
            this.element.addEventListener("mousemove", this.mouseMoveHandler, false);
            this.element.addEventListener("mouseout", this.mouseOutHandler, false);
            // リサイズ時の再描画処理は要求により削除
        }
        /**
         * Initialize
         */
        Initialize() {
            this.drawBackground();
            this.drawBorder();
        }
        /**
         * Draw.
         */
        draw() {
            var _a, _b;
            // クリア
            this.canvas.clearRect(0, 0, this.element.width, this.element.height);
            this.drawBackground();
            this.drawBorder();
            // 時間帯バンド
            if ((_a = this.config.hourBand) === null || _a === void 0 ? void 0 : _a.show) {
                this.drawHourBand();
            }
            const borderWidth = this.config.borderWidth;
            const startDateTime = this.config.time.start;
            const labelConfig = this.config.label;
            const padding = this.config.layout.padding;
            const self = this;
            if ((_b = this.config.hourBand) === null || _b === void 0 ? void 0 : _b.only) {
                return; // 時間帯のみ表示
            }
            const unitsTopOffset = this.unitsTopOffset;
            const unitsHeight = this.unitsDrawableHeight;
            this.timeUnits.forEach(function (timeUnit) {
                if (timeUnit.totalMinutes === 0)
                    return;
                // oneMinuteWidth 同期 (リサイズ対応)
                timeUnit.oneMinuteWidth = self.oneMinuteWidth;
                const startMinutes = DateTime.between(startDateTime, timeUnit.startTime).minutes;
                const x = padding.left + borderWidth + startMinutes * self.oneMinuteWidth;
                const y = padding.top + borderWidth + unitsTopOffset;
                const height = unitsHeight - borderWidth * 2 - (padding.top + padding.bottom);
                const width = timeUnit.width;
                self.canvas.fillStyle = timeUnit.color || "#fff";
                self.canvas.fillRect(x, y, width, height);
                if (labelConfig.showLabel && timeUnit.label) {
                    // 自動コントラスト
                    if (labelConfig.autoContrast) {
                        const fill = String(self.canvas.fillStyle);
                        let r = 0, g = 0, b = 0;
                        if (fill.startsWith('#')) {
                            const hex = fill.slice(1);
                            if (hex.length === 3) {
                                r = parseInt(hex[0] + hex[0], 16);
                                g = parseInt(hex[1] + hex[1], 16);
                                b = parseInt(hex[2] + hex[2], 16);
                            }
                            else if (hex.length === 6) {
                                r = parseInt(hex.substring(0, 2), 16);
                                g = parseInt(hex.substring(2, 4), 16);
                                b = parseInt(hex.substring(4, 6), 16);
                            }
                        }
                        else {
                            const m = fill.match(/rgba?\((\d+),(\d+),(\d+)/);
                            if (m) {
                                r = parseInt(m[1], 10);
                                g = parseInt(m[2], 10);
                                b = parseInt(m[3], 10);
                            }
                        }
                        const l = 0.299 * r + 0.587 * g + 0.114 * b;
                        self.canvas.fillStyle = l < labelConfig.contrastThreshold ? 'white' : 'black';
                    }
                    else {
                        self.canvas.fillStyle = 'black';
                    }
                    self.canvas.font = labelConfig.fontSize + " " + labelConfig.fontFamily;
                    // 垂直中央寄せ (テキストベースライン調整)
                    self.canvas.textBaseline = "middle";
                    // 最小幅チェック
                    if (width >= labelConfig.minWidthForText) {
                        const available = width - 4; // 左右マージン
                        const fontSizePx = parseInt(labelConfig.fontSize, 10) || 12;
                        const lineHeight = fontSizePx * (labelConfig.lineHeight || 1.2);
                        const maxLines = labelConfig.maxLines;
                        const verticalCenter = y + height / 2;
                        if (labelConfig.wrap) {
                            // 単語境界を気にせず文字単位でラップ (日本語想定)
                            const original = timeUnit.label;
                            const lines = [];
                            let current = "";
                            for (let i = 0; i < original.length; i++) {
                                const ch = original[i];
                                const test = current + ch;
                                const w = self.canvas.measureText(test).width;
                                if (w <= available) {
                                    current = test;
                                }
                                else {
                                    if (current.length > 0) {
                                        lines.push(current);
                                    }
                                    current = ch;
                                }
                                if (maxLines && lines.length >= maxLines) {
                                    break;
                                }
                            }
                            if (current.length > 0 && (!maxLines || lines.length < maxLines)) {
                                lines.push(current);
                            }
                            // maxLines 超過分を省略
                            if (maxLines && lines.length > maxLines) {
                                lines.length = maxLines;
                            }
                            // 縦位置: 全体高さ内で中央揃え
                            const totalTextHeight = lines.length * lineHeight;
                            let startY = verticalCenter - totalTextHeight / 2 + lineHeight / 2;
                            for (let li = 0; li < lines.length; li++) {
                                self.canvas.fillText(lines[li], x + 2, startY + li * lineHeight, available);
                            }
                        }
                        else {
                            let text = timeUnit.label;
                            let measured = self.canvas.measureText(text).width;
                            if (measured > available) {
                                if (!labelConfig.useEllipsis) {
                                    return; // 非表示
                                }
                                const ellipsis = "…";
                                const ellipsisWidth = self.canvas.measureText(ellipsis).width;
                                let left = 0;
                                let right = text.length - 1;
                                let cut = 0;
                                while (left <= right) {
                                    const mid = (left + right) >> 1;
                                    const substr = text.slice(0, mid + 1);
                                    const w = self.canvas.measureText(substr).width + ellipsisWidth;
                                    if (w <= available) {
                                        cut = mid + 1;
                                        left = mid + 1;
                                    }
                                    else {
                                        right = mid - 1;
                                    }
                                }
                                text = text.slice(0, cut) + ellipsis;
                            }
                            self.canvas.fillText(text, x + 2, verticalCenter, available);
                        }
                    }
                }
            });
        }
        // #region Private Functions.
        onMouseMove(sender, event) {
            var _a;
            const rect = this.element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const padding = this.config.layout.padding;
            const shouldShowTooltip = this.config.tooltip != null;
            this.config.time.start;
            if (!shouldShowTooltip) {
                return;
            }
            // パディング範囲は無視
            // left, right, top, bottom
            const unitsTopOffset = this.unitsTopOffset;
            const unitsHeight = this.unitsDrawableHeight;
            // ユニット領域外 (時間帯バンド含め) は無視
            // バンドのみ表示のときはツールチップ無効
            if ((_a = this.config.hourBand) === null || _a === void 0 ? void 0 : _a.only) {
                this.tooltip.hide();
                return;
            }
            if (x < padding.left ||
                x > this.drawableWidth - padding.right ||
                y < padding.top + unitsTopOffset ||
                y > padding.top + unitsTopOffset + unitsHeight - padding.bottom) {
                this.tooltip.hide();
                return;
            }
            const minutesFromStart = (x - padding.left - this.config.borderWidth) / this.oneMinuteWidth;
            const idx = this.binarySearchUnit(minutesFromStart);
            if (idx >= 0) {
                const unit = this.timeUnits[idx];
                const startMinutes = this.startMinutesArray[idx];
                if (minutesFromStart >= startMinutes &&
                    minutesFromStart <= startMinutes + unit.totalMinutes) {
                    this.tooltip.setPosition(event.clientX, event.clientY);
                    this.tooltip.text = this.config.tooltip(unit);
                    this.tooltip.show();
                    return;
                }
            }
            this.tooltip.hide();
        }
        onMouseOut(sender, event) {
            this.tooltip.hide();
        }
        /**
         * Draw Border.
         */
        drawBorder() {
            if (this.config.borderWidth <= 0) {
                return;
            }
            const padding = this.config.layout.padding;
            const bw = this.config.borderWidth;
            const x = padding.left;
            const y = padding.top;
            // clientWidth/Height ベースで論理ピクセルサイズを取得
            const w = this.elementWidth - padding.y - bw;
            const h = this.elementHeight - padding.x - bw;
            this.canvas.strokeStyle = this.config.borderColor;
            this.canvas.lineWidth = bw;
            this.canvas.strokeRect(x + bw / 2, y + bw / 2, Math.max(0, w), Math.max(0, h));
        }
        /**
         * Draw Background.
         */
        drawBackground() {
            const padding = this.config.layout.padding;
            this.canvas.fillStyle = this.config.backgroundColor;
            this.canvas.fillRect(padding.left, padding.top, this.drawableWidth, this.drawableHeight - padding.x);
        }
        /**
         * リソース解放 (イベント解除)
         */
        destroy() {
            if (this.mouseMoveHandler) {
                this.element.removeEventListener("mousemove", this.mouseMoveHandler);
            }
            if (this.mouseOutHandler) {
                this.element.removeEventListener("mouseout", this.mouseOutHandler);
            }
        }
        // #endregion
        /** 開始分配列再構築 */
        rebuildStartMinutesArray() {
            const startDateTime = this.config.time.start;
            this.startMinutesArray = this.timeUnits.map((u) => DateTime.between(startDateTime, u.startTime).minutes);
        }
        /** minutesFromStart に対して開始分が最大で start<= target のユニット index を返す */
        binarySearchUnit(minutesFromStart) {
            let low = 0;
            let high = this.startMinutesArray.length - 1;
            let candidate = -1;
            while (low <= high) {
                const mid = (low + high) >> 1;
                const val = this.startMinutesArray[mid];
                if (val <= minutesFromStart) {
                    candidate = mid;
                    low = mid + 1;
                }
                else {
                    high = mid - 1;
                }
            }
            return candidate;
        }
        /** 時間帯バンド描画 */
        drawHourBand() {
            const hb = this.config.hourBand;
            if (!(hb === null || hb === void 0 ? void 0 : hb.show))
                return;
            const padding = this.config.layout.padding;
            const borderWidth = this.config.borderWidth;
            const start = this.config.time.start.toDate();
            const end = this.config.time.end.toDate();
            const oneMinuteWidth = this.oneMinuteWidth;
            const placementTop = hb.placement === "top";
            // only モードではバンドを全高に拡張
            const hourHeight = hb.only
                ? this.drawableHeight - (padding.top + padding.bottom) - borderWidth * 2
                : hb.height;
            const bandY = placementTop
                ? padding.top + borderWidth
                : this.elementHeight - padding.bottom - borderWidth - hourHeight;
            // 背景帯
            this.canvas.save();
            this.canvas.font = hb.fontSize + " " + hb.fontFamily;
            this.canvas.textBaseline = "middle";
            this.canvas.fillStyle = hb.color;
            // 開始を次の「分=0」へ丸め
            const cursor = new Date(start.getTime());
            if (cursor.getMinutes() !== 0 || cursor.getSeconds() !== 0) {
                cursor.setMinutes(0, 0, 0);
                if (cursor.getTime() < start.getTime()) {
                    cursor.setHours(cursor.getHours() + 1);
                }
            }
            // (上で算出済み)
            while (cursor.getTime() < end.getTime()) {
                const hourStartMs = cursor.getTime();
                const hourEndMs = new Date(cursor.getTime());
                hourEndMs.setHours(hourEndMs.getHours() + 1);
                const clampedEnd = Math.min(hourEndMs.getTime(), end.getTime());
                const minutesFromStart = (hourStartMs - start.getTime()) / 60000;
                const minutesLen = (clampedEnd - hourStartMs) / 60000;
                const x = padding.left + borderWidth + minutesFromStart * oneMinuteWidth;
                const w = minutesLen * oneMinuteWidth;
                // 交互塗り
                if (hb.alternateFill && cursor.getHours() % 2 === 1) {
                    this.canvas.fillStyle = hb.alternateFill;
                    this.canvas.fillRect(x, bandY, w, hourHeight);
                }
                // 区切り線
                if (hb.showSeparators) {
                    this.canvas.strokeStyle = hb.lineColor;
                    this.canvas.lineWidth = 1;
                    this.canvas.beginPath();
                    this.canvas.moveTo(x + 0.5, bandY);
                    this.canvas.lineTo(x + 0.5, bandY + hourHeight);
                    this.canvas.stroke();
                }
                // 時刻ラベル
                this.canvas.fillStyle = hb.color;
                const hourStr = ("0" + cursor.getHours()).slice(-2);
                const textX = x + 2;
                const textY = bandY + hourHeight / 2;
                this.canvas.fillText(hourStr, textX, textY, w - 4);
                // 次の時間へ
                cursor.setHours(cursor.getHours() + 1, 0, 0, 0);
            }
            // 外枠線（バンド区切り）: only モードでは全体枠線を優先するため省略
            if (!hb.only) {
                this.canvas.strokeStyle = hb.lineColor;
                this.canvas.lineWidth = 1;
                this.canvas.strokeRect(padding.left + borderWidth, bandY, this.drawableWidth - borderWidth * 2, hourHeight);
            }
            this.canvas.restore();
        }
    }

    return TimelineChart;

}));
//# sourceMappingURL=TimelineChart.js.map
