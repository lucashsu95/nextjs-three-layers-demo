import { useQuery } from '@tanstack/react-query';
import { Team } from '@/types/team';

export function useTeamsData(initialData?: Team[]) {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async (): Promise<Team[]> => {
      const response = await fetch('/api/teams');
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      return response.json();
    },
    initialData,
    staleTime: 5 * 60 * 1000, // 5 分鐘
    refetchOnWindowFocus: false,
  });
}