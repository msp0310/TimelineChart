# TimelineChart

HTML5 Canvas を用いて「時間帯の状態遷移 (稼働 / 停止 など)」をシンプルに可視化する軽量タイムラインバーコンポーネントです。UMD で配布しているため `<script>` タグ / モジュールバンドラの双方で利用できます。

## 主なユースケース

- 設備 / 装置の稼働状況ガント風表示
- 日次スケジュール (稼働 / 休止 / メンテ) の可視化
- 1 日(もしくは任意範囲) の状態ラベル付きタイムライン

## 特徴

- 依存は `typescript-dotnet-es6` のみ (日付計算用途)
- 約数十行のシンプル実装で拡張しやすい
- 任意ラベル表示 (フォント/サイズ指定可)
- カスタムツールチップコールバック

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
    startTime: string; // 'HH:mm'
    endTime: string; // 'HH:mm'
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
| time.start                           | string             | `00:00`       | 描画開始時刻 (24h, `HH:mm`)            |
| time.end                             | string             | `24:00`       | 描画終了時刻 (24h, `HH:mm`)            |
| layout.padding.top/left/right/bottom | string(px)         | `0`           | 余白 (数値文字列)                      |
| label.showLabel                      | boolean            | `false`       | ラベル描画有無                         |
| label.fontFamily                     | string             | `メイリオ`    | ラベルフォント                         |
| label.fontSize                       | string             | `14px`        | ラベルフォントサイズ                   |
| tooltip                              | `(unit) => string` | `undefined`   | ツールチップ HTML (戻り値は innerHTML) |

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
4. 24:00 指定を終端として扱います。翌日跨ぎなどは未対応です (必要なら拡張してください)。
5. オーバーラップした区間は後続要素で上書き描画されます (重なり表現は非対応)。

## サンプル

`sample/sample.html` をブラウザで開いてください。

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
