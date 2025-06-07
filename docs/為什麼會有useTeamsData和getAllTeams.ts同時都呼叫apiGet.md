
# 為什麼會有useTeamsData和getAllTeams.ts同時都呼叫apiGet

**第一層：Server Components (getAllTeams.ts)**
```typescript
// 用於服務器端渲染，提供初始數據
export async function getAllTeams(): Promise<Team[]> {
  const response = await apiGet<TeamsListResponse>('/teams');
  return response.teams;
}
```
**目的**：在頁面首次加載時在服務器端獲取數據，提供更好的 SEO 和首屏性能。

**第二層：React Query (`useTeamsData`)**

用於客戶端數據管理和快取

```typescript
export function useTeamsData(initialData?: Team[]) {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async (): Promise<Team[]> => {
      const response = await apiGet<TeamsListResponse>('/teams');
      return response.teams;
    },
    initialData, // 使用服務器端的初始數據
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
```

### 為什麼需要兩個？

1. **不同的執行環境**
- `getAllTeams`: 在 **服務器端** 執行，用於 SSR
- `useTeamsData`: 在 **客戶端** 執行，用於後續的數據管理

2. **不同的生命週期**
- **服務器端**: 頁面首次渲染時執行一次
- **客戶端**: 提供持續的數據管理（快取、重新獲取、更新等）

3. **React Query 的價值**
```typescript
// 在 OrganizationProvider 中的使用
export function OrganizationProvider({ children, initialTeams }: OrganizationProviderProps) {
  const { data: teams = [], isLoading, error, refetch } = useTeamsData(initialTeams);
  // ↑ 提供了 loading 狀態、錯誤處理、重新獲取等功能
}
```

**完整的數據流程**

1. **初始渲染**：服務器端使用 `getAllTeams()` 獲取數據
2. **客戶端接管**：React Query 使用服務器端數據作為初始值
3. **用戶交互**：創建/刪除團隊時使用樂觀更新
4. **自動同步**：操作完成後自動重新驗證數據

**如果只用 `getAllTeams()` 會怎樣？**

```typescript
// 沒有 React Query 的情況
const [teams, setTeams] = useState(initialTeams);
const [loading, setLoading] = useState(false);

const refetch = async () => {
  setLoading(true);
  try {
    const newTeams = await getAllTeams(); // 每次都要重新請求
    setTeams(newTeams);
  } finally {
    setLoading(false);
  }
};
```

**問題**：
- 沒有快取，每次都重新請求
- 沒有樂觀更新，操作感覺很慢
- 需要手動管理 loading/error 狀態
- 多個組件間難以共享數據狀態

**總結**

`useTeamsData` 不是重複，而是將服務器端的「一次性數據獲取」升級為客戶端的「智能數據管理系統」。這就是三層架構的核心價值：結合服務器端渲染的性能優勢和客戶端狀態管理的用戶體驗優勢。