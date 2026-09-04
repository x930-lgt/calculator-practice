# TypeScript Calculator

## 概要

TypeScriptで作成した電卓アプリです。

## 使用技術

* HTML
* CSS
* TypeScript
* Vitest

## 機能

* 四則演算（加算・減算・乗算・除算）
* 小数計算
* 負数計算
* 連続計算
* 計算履歴の表示
* 0除算エラー
* 桁数に応じた指数表記
* クリア機能

## 工夫した点

* TypeScriptの型を活用し、演算子や電卓の状態を型安全に管理しました。
* 各クラスの役割を理解し、それぞれの責務を意識して実装しました。
* `IDisplay` インターフェースを使用し、電卓本体の処理と画面表示の責務を分離しました。
* `KeyMapper` を使用し、DOMから取得したキー入力を電卓内部で扱う `KeyToken` に変換する処理を分離しました。
* 正常系だけでなく、0除算や不正な入力などの異常系も考慮してテストケースを作成しました。
* 境界値を意識して試験項目を作成し、Googleスプレッドシートで試験書を作成・実施しました。


## 単体テスト

Vitestを使用して、以下のクラスの単体テストを実施しています。

* `Calculator`
* `Evaluator`
* `InputBuffer`
* `NumberFormatter`
* `KeyMapper`
* `OperationToSymbol`
* `DomDisplay`

### 画面試験

Googleスプレッドシートで試験書を作成し、実際の画面操作による動作確認を実施しています。

正常系・異常系に加えて、境界値を意識した試験項目を作成し、全項目の動作確認を実施しました。
画面試験で使用した試験書です。

[試験書（PDF）](./docs/試験書.pdf)


## 起動方法

### 1. リポジトリをクローン

ターミナルで以下のコマンドを実行してください。

```bash
git clone https://github.com/x930-lgt/typescript-calculator.git
cd typescript-calculator
```

### 2. 依存パッケージをインストール

以下のコマンドを実行してください。

```bash
npm install
```

### 3. 開発サーバーを起動

以下のコマンドを実行してください。

```bash
npm run dev
```

起動後、ターミナルに表示されたURLをブラウザで開いてください。

