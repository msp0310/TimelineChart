# TimelineChart

HTML5 Canvas を用いて「時間帯の状態遷移 (稼働 / 停止 など)」をシンプルに可視化する軽量タイムラインバーコンポーネントです。UMD で配布しているため `<script>` タグ / モジュールバンドラの双方で利用できます。

## 主なユースケース

- 設備 / 装置の稼働状況ガント風表示
- 日次スケジュール (稼働 / 休止 / メンテ) の可視化
- 1 日(もしくは任意範囲) の状態ラベル付きタイムライン

## 特徴

- 外部日付ライブラリ非依存 (内部軽量 DateTime/TimeSpan 実装)
- HH:mm / YYYY-MM-DD HH:mm / YYYY/MM/DD HH:mm / ISO 8601 文字列対応
- マルチデイ(開始と終了が日付跨ぎ)をシームレスに描画
- ラベル: 省略 (…)/ 折り返し / 最小幅制御
- 時間帯バンド (時刻HH) を上下に追加表示 / 単独表示可能
- DPI 対応 (HiDPI/Retina で鮮明)
- 任意ラベル表示 (フォント/サイズ指定可)
- カスタムツールチップ (HTML 直接 / XSS 考慮は利用側で)

## インストール / 利用方法

### 1. ブラウザ (UMD)

`dist/TimelineChart.js` を読み込み (ビルド済みアセット)。

```html
<script src="/path/to/dist/TimelineChart.js"></script>
<canvas id="chart" width="800" height="50"></canvas>
<script>
      const chart = new TimelineChart(document.getElementById('chart'), {
          config: {
              time: { start: '06:00', end: '24:00' },
              borderWidth: 1,
              backgroundColor: 'white',
              layout: { padding: { top: '0', left: '0', right: '0', bottom: '0' } },
              label: { showLabel: true, fontFamily: 'メイリオ', fontSize: '12px' },
              tooltip: unit => `開始: ${unit.startTimeText}<br>終了: ${unit.endTimeText}<br>ラベル: ${unit.label}`
          },
          data: [
              { startTime: '06:00', endTime: '07:00', color: 'rgba(255,0,0,1)', label: '計画停止' },
              { startTime: '07:00', endTime: '12:00', color: 'rgba(0,255,0,1)', label: '正常' },
              { startTime: '12:00', endTime: '13:00', color: 'rgba(255,0,0,1)', label: '計画停止' }
          ]
      });
      chart.draw();
  }
</script>
```

### 2. npm (バンドラ)

```
npm install timeline-chart
```

```ts
import TimelineChart from "timeline-chart";

const chart = new TimelineChart(canvasEl, {
  /* 上記と同様 */
});
chart.draw();
```

## データ構造

コンストラクタ第二引数は以下の形。

```ts
interface TimelineChartOptions {
  config: ConfigLike;
  data: Array<{
  startTime: string; // 時刻 or 日時
  endTime: string;   // 同上
    color?: string;
    label?: string; // ラベル表示 (label.showLabel=true の場合に描画)
  }>;
}
```

## 設定 (config)

| キー                                 | 型                 | 既定値        | 説明                                   |
| ------------------------------------ | ------------------ | ------------- | -------------------------------------- |
| borderColor                          | string             | `#000`        | 外枠線色                               |
| borderWidth                          | number             | `1`           | 外枠線幅 (0 以下で枠非表示)            |
| backgroundColor                      | string             | `transparent` | 背景色                                 |
| time.start                           | string             | `00:00`       | 開始 (HH:mm / 日時文字列)              |
| time.end                             | string             | `24:00`       | 終了 (HH:mm / 日時文字列)              |
| layout.padding.top/left/right/bottom | string(px)         | `0`           | 余白 (数値文字列)                      |
| label.showLabel                      | boolean            | `false`       | ラベル描画有無                         |
| label.fontFamily                     | string             | `メイリオ`    | ラベルフォント                         |
| label.fontSize                       | string             | `14px`        | ラベルフォントサイズ                   |
| label.minWidthForText                | number             | `20`          | この幅未満ならラベル非表示             |
| label.useEllipsis                    | boolean            | `true`        | 幅超過時に末尾へ `…` を付ける          |
| label.wrap                           | boolean            | `false`       | 幅超過時に折り返し                     |
| label.maxLines                       | number?            | `undefined`   | 折り返し最大行数 (未指定=制限なし)     |
| label.lineHeight                     | number             | `1.2`         | 行間係数                               |
| tooltip                              | `(unit) => string` | `undefined`   | ツールチップ HTML (戻り値は innerHTML) |
| hourBand.show                        | boolean            | `false`       | 時間帯バンド表示                       |
| hourBand.only                        | boolean            | `false`       | バンドのみ (ユニット非表示)            |
| hourBand.placement                   | 'top' \| 'bottom'  | `bottom`      | バンド表示位置                         |
| hourBand.height                      | number             | `20`          | バンド高さ(px)                         |
| hourBand.fontSize                    | string             | `10px`        | バンドフォントサイズ                   |
| hourBand.fontFamily                  | string             | `メイリオ`    | バンドフォント                         |
| hourBand.color                       | string             | `#000`        | 時刻文字色                             |
| hourBand.lineColor                   | string             | `#ccc`        | 区切り線色                             |
| hourBand.showSeparators              | boolean            | `true`        | 時間ごと縦線表示                       |
| hourBand.alternateFill               | string?            | `undefined`   | 奇数時間背景色 (透明推奨)             |

### Tooltip コールバック引数 (TimeUnitElement)

| プロパティ    | 型       | 説明                                    |
| ------------- | -------- | --------------------------------------- |
| startTime     | DateTime | 開始日時 (ライブラリ型)                 |
| endTime       | DateTime | 終了日時                                |
| startTimeText | string   | フォーマット済み文字列 `YYYY/M/D HH:mm` |
| endTimeText   | string   | 同上                                    |
| totalMinutes  | number   | 区間の分数                              |
| label         | string   | ラベル                                  |

## メソッド / プロパティ (抜粋)

| 名称                         | 種別              | 説明                                |
| ---------------------------- | ----------------- | ----------------------------------- |
| constructor(canvas, options) | ctor              | インスタンス生成                    |
| draw()                       | method            | タイムライン描画 (初期化後手動実行) |
| timeUnits                    | TimeUnitElement[] | 生成された区間リスト                |
| totalMinutes                 | number            | 全体範囲 (start/end) の総分数       |
| oneMinuteWidth               | number            | 1 分あたりのピクセル幅              |

## 振る舞い / 注意点

1. `data` の配列順で左から順に描画されます (開始時刻順でない場合でもそのまま)。必要に応じてソートしてください。
2. 時間帯にギャップがある場合はその領域は背景色になります。
3. 開始・終了が同一 (0 分) の要素は無視されます。
4. 日時形式を混在利用可能 (内部では Date オブジェクト換算)。
5. オーバーラップした区間は後続要素で上書き描画されます (重なり表現は非対応)。
6. ツールチップは `innerHTML` へそのまま挿入されるため外部入力を埋め込む場合は XSS 対策を行ってください。

## サンプル

`sample/sample.html` をブラウザで開いてください。

### サンプル抜粋 (24h 跨ぎ + 時間帯バンド)

```html
<canvas id="chart" width="1000" height="70"></canvas>
<script>
  const chart = new TimelineChart(document.getElementById('chart'), {
    config: {
      time: {
        start: '2025-08-11 06:00',
        end:   '2025-08-12 05:59'
      },
      borderWidth: 1,
      backgroundColor: 'white',
      label: { showLabel: true, fontSize: '12px', wrap: true, maxLines: 2 },
      hourBand: { show: true, placement: 'top', alternateFill: 'rgba(0,0,0,0.03)' },
      tooltip: u => `開始: ${u.startTimeText}<br>終了: ${u.endTimeText}<br>${u.label}`
    },
    data: [
      { startTime: '2025-08-11 06:00', endTime: '2025-08-11 07:00', color: 'rgba(255,0,0,1)', label: '計画停止' },
      { startTime: '2025-08-11 07:00', endTime: '2025-08-11 12:00', color: 'rgba(0,255,0,1)', label: '正常運転' },
      { startTime: '2025-08-11 23:30', endTime: '2025-08-12 00:30', color: 'rgba(0,128,255,1)', label: '夜間メンテ' }
    ]
  });
  chart.draw();
</script>
```

## 開発 (ローカルビルド)

```
npm install
npm run build   # dist/TimelineChart.js 生成
npm run watch   # 監視ビルド
```

## 拡張のヒント

- クリックイベント: `TimelineChart` の `element` (canvas) に `click` ハンドラを追加し、`timeUnits` をヒットテスト。
- 追加情報表示: `TimeUnitElement` に任意フィールドを追加し tooltip コールバックで参照。
- 日付跨ぎ対応: `time.start` / `time.end` を Date オブジェクト化し翌日分を計算するロジックを `TimeConfig` に追加。

## ライセンス

MIT © 2025 Sawada Makoto

---

不具合・要望は Issue へお気軽にどうぞ。
