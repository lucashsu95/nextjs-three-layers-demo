import { useQuery } from '@tanstack/react-query';
import { Team } from '@/types/team';
import { apiGet } from '@/lib/api';
import { TeamsListResponse } from '@/types/api';

export function useTeamsData(initialData?: Team[]) {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async (): Promise<Team[]> => {
      // 選項1: 直接呼叫 Spring Boot API
      const response = await apiGet<TeamsListResponse>('/teams');
      return response.teams;
      
      // 選項2: 透過 Next.js API 路由 (如果您選擇使用代理層)
      // const response = await fetch('/api/teams');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch teams');
      // }
      // const apiResponse = await response.json();
      // if (!apiResponse.result) {
      //   throw new Error(apiResponse.message);
      // }
      // return apiResponse.data.teams;
    },
    initialData,
    staleTime: 5 * 60 * 1000, // 5 分鐘
    refetchOnWindowFocus: false,
  });
}