# MK8DX NITA DB

## 概要
マリオカート8DXにおける、NITAの記録を管理・閲覧することを目的としたWebアプリケーション

## 仕様
MK8DX NITA DB User Settingsスプレッドシートに登録されているユーザーIDがパスにあるとき、
それに対応するAPI IDを元にSSSAPIのAPIを叩いてデータを取得する。
- 実際にブラウザのURLやPostman等からURLを叩かれると他人のAPI IDが分かってしまうが、ブラウザのDeveloper toolsから見えるのと、スプレッドシート自体本人と管理者しかわからず編集権限も限られるため問題無い。
- 他人に共有できるように利便性をもたせる。

## デプロイ手順
- ※`wr.json`を更新して、assets配下に配置すること
1. `npm run build`を実行
2. `firebase deploy`を実行