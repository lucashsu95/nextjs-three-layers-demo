import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Team, CreateTeamRequest } from '@/types/team';

export function useTeamMutations() {
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: async (newTeam: CreateTeamRequest): Promise<Team> => {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeam),
      });
      if (!response.ok) throw new Error('Failed to create team');
      return response.json();
    },
    onMutate: async (newTeam) => {
      // 取消任何進行中的查詢
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      
      // 獲取當前數據
      const currentTeams = queryClient.getQueryData<Team[]>(['teams']) || [];
      
      // 樂觀更新
      const optimisticTeam: Team = {
        ...newTeam,
        id: `temp-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      queryClient.setQueryData<Team[]>(['teams'], [...currentTeams, optimisticTeam]);
      
      return { currentTeams };
    },
    onError: (err, variables, context) => {
      // 發生錯誤時回滾
      if (context?.currentTeams) {
        queryClient.setQueryData(['teams'], context.currentTeams);
      }
    },
    onSettled: () => {
      // 重新驗證數據
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (teamId: string): Promise<void> => {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete team');
    },
    onMutate: async (teamId) => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      
      const currentTeams = queryClient.getQueryData<Team[]>(['teams']) || [];
      
      // 樂觀刪除
      queryClient.setQueryData<Team[]>(
        ['teams'],
        currentTeams.filter(team => team.id !== teamId)
      );
      
      return { currentTeams };
    },
    onError: (err, teamId, context) => {
      if (context?.currentTeams) {
        queryClient.setQueryData(['teams'], context.currentTeams);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });

  return {
    createTeam: createTeamMutation.mutate,
    deleteTeam: deleteTeamMutation.mutate,
    isCreating: createTeamMutation.isPending,
    isDeleting: deleteTeamMutation.isPending,
    createError: createTeamMutation.error,
    deleteError: deleteTeamMutation.error,
  };
}