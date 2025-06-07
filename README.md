# 三層數據架構實做

## 前言

如何使用「三層數據架構」來避免常見的問題，如重複請求、效能問題、狀態管理混亂等。

## 架構概述

三層數據架構包含：
1. **第一層：Server Components** - 初始數據獲取
2. **第二層：React Query** - 客戶端快取和更新
3. **第三層：Optimistic Updates** - 即時UI反饋


## 核心概念
三層數據架構分為：Server Components（初始數據獲取）、React Query（客戶端快取和更新）、Optimistic Updates（即時UI反饋） Robust Data Fetching Architecture For Complex React/Next.js Apps

## 主要特色
- 明確的檔案路徑 - 每個檔案都有完整的路徑說明
- 步驟化實作 - 從建立專案到完成功能的詳細步驟
- 繁體中文介面 - 所有 UI 文字都是繁體中文
- 完整的 TypeScript 支援 - 包含型別定義和型別安全
- 實用的功能 - 包含建立、刪除團隊的完整功能

## 架構優勢
- 避免常見問題 - 解決重複請求、狀態管理混亂、記憶體洩漏等問題
- 優秀的使用者體驗 - 樂觀更新讓操作感覺即時
- 良好的效能 - 伺服器端渲染結合客戶端快取
- 可維護性 - 關注點分離，代碼結構清晰

## Getting Started

```bash
npm run dev
```

## Setup Record

```bash
npx create-next-app@latest my-data-app --typescript --tailwind --eslint --app
npm install @tanstack/react-query @tanstack/react-query-devtools
```

## Q&A

`app/items/route.ts`
`app/items/[itemId]/route.ts`

可以透過 Next.js API 路由 (如果您選擇使用代理層)(這兩個檔案目前沒用到)

### React query 執行流程
```
1. onMutate (樂觀更新) → 包含所有樂觀更新邏輯
2. mutationFn (實際請求) → 發送 HTTP 請求
3. onSuccess/onError (結果處理) → 根據請求結果處理
4. onSettled (最終處理) → 無論成功失敗都執行
```

- [三層封裝](./docs/三層封裝.md)
- [為什麼 useTeamMutations 沒有再被包裝](./docs/為什麼%20useTeamMutations%20沒有再被包裝.md)
- [為什麼會有useTeamsData和getAllTeams.ts同時都呼叫apiGet](./docs/為什麼會有useTeamsData和getAllTeams.ts同時都呼叫apiGet.md)
- [為什麼要使用React%20Query](./docs/為什麼要使用React%20Query.md)
