import { useQuery } from '@tanstack/react-query';
import { Team } from '@/types/team';
import { getAllTeams } from '@/queries/teams/getAllTeams';

export function useTeamsData(initialData?: Team[]) {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getAllTeams,
    initialData,
    staleTime: 5 * 60 * 1000, // 5 分鐘
    refetchOnWindowFocus: false,
  });
}