
# 為什麼要使用React Query

React Query 解決的問題

1. **快取管理**
```typescript
// 避免重複請求
staleTime: 5 * 60 * 1000, // 5分鐘內不會重新請求
```

2. **樂觀更新**
```typescript
// useTeamMutations.ts 中的樂觀更新
onMutate: async (newTeam) => {
  // 立即更新 UI，不等待服務器回應
  queryClient.setQueryData<Team[]>(['teams'], [...currentTeams, optimisticTeam]);
}
```

3. **狀態同步**
```typescript
// 當創建/刪除團隊後，自動更新團隊列表
onSettled: () => {
  queryClient.invalidateQueries({ queryKey: ['teams'] });
}
```
