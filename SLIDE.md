---
theme: "black"
transition: "default"
---

## モダンな JS で開発するための環境構築講座

---

## なぜ環境構築の話を行うのか

- 基本的に仕事をする上では必要ない（すでにあるから）
- そのため、必死になって勉強する必要はない（React 講座でも扱わなかった）
- とはいえ、自力の向上のためには自分で好き放題するコードベースが必要
- 環境構築ができるようになろう

---

## 僕はスターターコードを書いています。

いつでも Hello World できる仕組みを作っています
https://github.com/sadnessOjisan/boilerplate-react-js

---

## ここで扱う環境

- ES2015
- React

---

## それでは始めていきましょう

---

## JS の環境構築は狂ってやがる！

Hello world するために必要なもの
（実際は不要なものも含まれていますが、自分が何か SPA を開発するときに最低限突っ込んでるライブラリです。）

```json
 "dependencies": {
    "axios": "^0.18.0",
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-redux": "^5.1.1",
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.1",
    "redux-logger": "^3.0.6",
    "redux-saga": "^0.16.2",
    "reselect": "^4.0.0",
    "styled-components": "^4.1.1"
  },
  "devDependencies": {
    "@babel/core": "^7.1.6",
    "@babel/plugin-transform-flow-strip-types": "^7.1.6",
    "@babel/preset-env": "^7.1.6",
    "@babel/preset-react": "^7.0.0",
    "@storybook/react": "^4.0.8",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^10.0.1",
    "babel-jest": "^23.6.0",
    "babel-loader": "^8.0.4",
    "babel-preset-flow": "^6.23.0",
    "eslint": "^5.9.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^3.3.0",
    "eslint-plugin-flowtype": "^3.2.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jest": "^22.1.2",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-prettier": "^3.0.0",
    "eslint-plugin-react": "^7.11.1",
    "flow-bin": "^0.86.0",
    "flow-typed": "^2.5.1",
    "html-webpack-plugin": "^3.2.0",
    "husky": "^1.2.0",
    "jest": "^23.6.0",
    "lint-staged": "^8.1.0",
    "prettier": "^1.15.2",
    "webpack": "^4.26.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  }
```

---

## JS の環境構築は大きく分けて二つ

- Hello world するためにそもそも必要
- DX を向上させる

---

## 大前提

- ブラウザは React のコードをそのままで読み取れない
- React をブラウザが読めるように変換する仕組みが必要

---

## Hello world するために必要なライブラリ/仕組み

- react
- react-dom
- babel
- webpack
- これらに刺す大量の plugin 群

---

## ライブラリを install

- ライブラリの install は package manager を使う
- npm(Node Package Manger)を利用
- npm で入れたライブラリは package.json で管理される
- package.json は js 開発に必要なタスクなどを登録できる

---

## npm script

```json
"scripts": {
    "build": "webpack",
    "format": "prettier --write './src/**/*.jsx'",
    "lint": "eslint --fix 'src/**/*.js'",
}
```

```
$ npm run build
// -> webpack
```

---

## babel が何をやっているか

- ブラウザで動かない JS を動く JS に変換する
- React -> Browser で動く JS
- ES6 -> Browser で動く JS

（誤解を恐れずにいうならば）コンパイラ

---

## babel を使うためには

babelrc というファイルをプロジェクトルート直下に置く

```js
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        },
        "modules": false
      }
    ]
  ]
}
```

---

## 登場人物多すぎー！

- plugin: babel にどういう変換をさせたいかを定義できる
- preset: 複数の plugin をセットにしたもの. 最近は preset だけを使うだけで解決することが多い

---

## 一個一個解説していきます

---

```js
{
  "presets": [ // 下にある「plugin」をセットにしたもの
    "@babel/preset-react", // reactを動かすためのpluginをセットにしたもの
    [
      "@babel/preset-env", // 指定したブラウザ向けに必要になるpluginをセットにしたものを入れてくれるもの
      {
        "targets": {
          "node": "current"
        },
        "modules": false
      }
    ]
  ]
}
```

---

## なんで babel が難しいか

一つの目的を成し遂げるための設定に複数方法がある

- ある目的を達成するための preset は複数の preset や設定で置き換えることもできる
- ググった時によって、ベストプラクティス的なものが変わっている

---

## webpack がなにをやっているか

- 依存の解決(ファイル間の繋がりをリンクしてくれる)
- babel を動かしてくれる

webpack を実行 →  登録したタスクの実行（babel の適用とかもしてくれるよ） → 色々なファイルを結合 → ブラウザで読み取れる

（誤解を恐れずにいうならば）リンカ

---

## webpack を導入する

```
$ npm i -D webpack webpack-cli
```

---

```js
module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  output: {
    path: "./dist",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  }
};
```

---

## これも登場人物おおすぎおかしいだろ！

- mode:ビルドモード. development or production. minify の有無とか
- entry: 依存解決のスタート地点を指定する
- output: 依存解決後のファイルをどこに、どんな名前で吐き出すかを指定
- module: リンカを実行するときの便利タスクや設定を指定する場所
- resolve: 依存解決するファイルの拡張子を指定（import 時に拡張子がいらなくなる嬉しさがある）

本当はもっとありますが、一旦はこれだけで OK

---

## もう一度ファイルをみてみよう

```js
module.exports = {
  mode: "development", // development or production
  entry: "./src/main.jsx", // 依存解決の起点を指定
  output: {
    path: "./dist",
    filename: "build.js"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: : "babel-loader"} // どんな便利機能を使うか. loaderのinstallが必要
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"] // 依存解決するファイルの拡張子を指定
  }
};
```

---

## loader について

Loaders are transformations that are applied on the source code of a module.

```
module: {
    rules: [
      { test: /\.(js|jsx)$/, use: : "babel-loader"} // どんな便利機能を使うか. loaderのinstallが必要
    ]
  }
```

```
npm i -D babel-loader
```

## webpack を実行する

npm script を package.json に定義

```json
build: webpack
```

---

## とりあえず React で Heelo World までをライブコーデイング

---

## DX を上げていく

1. linter: 構文の誤りや、非推奨な書き方を検出してくれる
2. formatter:  人が読みやすいようにコードを整形してくれる
3. hook: commit hook に上記処理を割り込まさせられる
4. type checker: 実行前に型エラーを検出してくれる
5. test

ここでは 1,2 のみを扱います.
3 以降はスターターコードを読むか、質問に来てください。

---

## いったいどういう仕組みなのか

元々のソースコード -> AST -> 処理を加える ->  完成後のソースを吐き出す

---

## AST ってなんだよ

言語の意味に関係ない情報を取り除き、意味に関係ある情報のみを取り出した（抽象した）木構造のデータ構造

by wikipedia

---

## 例えばこんな感じ

by azu さんのブログ(https://efcl.info/2016/03/06/ast-first-step/)

```js
// ソースコード
var a = 1;

// AST
{
  "range": [
    0,
    10
  ],
  "type": "Program",
  "body": [
    {
      "range": [
        0,
        10
      ],
      "type": "VariableDeclaration",
      "declarations": [
        {
          "range": [
            4,
            9
          ],
          "type": "VariableDeclarator",
          "id": {
            "range": [
              4,
              5
            ],
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "range": [
              8,
              9
            ],
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
}
```

---

## AST にすると何が嬉しいのか

- ソースコードの変換を、AST の変換として操作できる
- Parser で AST を作り、Traverser で変換し、Generator でソースコードに戻す

---

## AST に興味がある人はこういう本を読んでみてくださいー

Go で作るインタプリタ入門

---

## linter を導入する

eslint

---

## eslint をつかうためには

`npm i -D eslint`

---

## rule をカスタマイズしたければ

.eslintrc をプロジェクト直下に置く

```js
{
  "extends": ["airbnb"],
  "plugins": ["prettier", "flowtype", "jest"],
  "env": {
    "browser": true
  },
  "globals": {
    "document": false,
    "console": true
  },
  "rules": {
    "no-console": "off",
    "prettier/prettier": "error",
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false
      }
    ]
  }
}

```

---

## 登場人物多すぎぃ

- extends
- plugins
- env
- blobals
- rules

---

## 小さい構成

```js
{
   // airbnb以外にもreact-appなどある. aribnbは厳しめのルール
  "extends": ["airbnb"]
}

```

---

## formatter を導入する

`npm i -D prettier`

---

## prettier の設定ファイルも  おいておこう

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "parser": "flow"
}
```

- これはなくても動く 
- しかしプロジェクト配下にこのファイルがあると、エディタが保存時に自動的に適用してくれたりして便利なことが多い

---

## linter vs formatter

実は eslint と prettier はよくルールが  競合する

ex) pretteir で整形したファイルが lint の構文エラーに当たっていました

---

## linter と formatter の  共存をする

eslint に prettier のプラグインを刺す

```js
{
  "extends": ["airbnb", "prettier", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
}
```

---

## これらの便利コマンドを CLI で実行

npm script を package.json に書く

```json
  "formatJS": "prettier --write './src/**/*.js'",
  "formatJSX": "prettier --write './src/**/*.jsx'",
  "lint": "eslint --fix 'src/**/*.js'",
```

```
$ npm run lint
```

---

## これで楽しく開発できますね！
