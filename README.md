# 法律奇想終極全紀錄 ⚖️

50 場與幽默 AI 律師的奇案問答。純前端 SPA，資料寫死在 `resources/js/data/cases.js`。

## 開發

```sh
nvm use            # node v22
npm install
npm run serve      # http://localhost:8080
```

## 建置

```sh
npm run production # 輸出至 public/
```

## 結構

採用 [project-common](../../project-common/) 的 Vue 3 + Vite + Pinia 架構。

- `resources/js/data/cases.js` — 50 案資料（題目 + 律師回覆 markdown），分散在 `resources/js/data/cases/part{1..6}*.js`
- `resources/js/data/parts.js` — 五大分類（物理 / 親密 / 物權 / 人權 / 金融奇幻）
- `resources/js/components/pages/home/HomeIndex.vue` — 首頁列表
- `resources/js/components/pages/case/CaseDetail.vue` — 單案詳情
