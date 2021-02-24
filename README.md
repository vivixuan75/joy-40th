## 指令列表

-   `npm run watch` -  執行開發模式(會開啟模擬瀏覽器並監聽相關檔案)
-   `npm run build` -  執行編譯模式(不會開啟瀏覽器)
-   `npm run prod` -  執行編譯模式(不會開啟瀏覽器，並且 tailwindcss 執行
-   `gulp deploy` - 將 dist 資料夾部署至 GitHub Pages

## 說明

除了 Boostrap CSS 與 Boostrap JavaScript 需要掛 CDN 之外，本身已經內建打包 jQuery 3.5.1。

## 支援的監聽

目前支援 HTML、ejs、JavaScript、Images、SCSS 監聽並自動重新刷新。

圖片新增時也會自動刷新。

## 安裝

需確認是否有安裝 gulp `gulp -v` 可查看版本，因為要使用 gulp-postcss 編譯 Tailwindcss 所以需要安裝 9.0.0 版

```cmd
npm install -g gulp@9
npm install
```
