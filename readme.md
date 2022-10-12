# フロント開発環境

## 環境
- gulp 
- esbuild
- babel 7.x
- browserSync

## メモ
- タスクランナーはテーマに設置してあるのでテーマディレクトリで起動する
- `sudo yarn` or `npm install`で環境作成
- node_modulesがpermission errorの場合は `sudo chmod 777 [node_modulesのパス]`で権限を変更すればOK

### npm scripts
- `npm run dev` or `yarn dev` 開発モード
- `npm run build` or `yarn build` 本番モードでビルド
- `npm run imagemin` or `yarn imagemin` 画像圧縮

### gulp タスク
- `npx gulp` or `yarn gulp` gulp起動
- `npx gulp imagemin` or `yarn gulp imagemin` 画像圧縮
