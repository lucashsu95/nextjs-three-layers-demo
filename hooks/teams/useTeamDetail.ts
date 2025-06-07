import { useQuery } from '@tanstack/react-query';
import { Team } from '@/types/team';
import { getTeamById } from '@/queries/teams/getTeamById';

export function useTeamDetail(teamId: string, initialData?: Team) {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => getTeamById(teamId),
    initialData,
    staleTime: 5 * 60 * 1000, // 5 分鐘
    refetchOnWindowFocus: false,
    enabled: !!teamId, // 只有當 teamId 存在時才執行查詢
  });
}