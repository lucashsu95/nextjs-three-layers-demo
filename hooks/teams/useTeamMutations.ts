import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Team, CreateTeamRequest } from '@/types/team';
import { createTeam } from '@/queries/teams/createTeam';
import { updateTeamById } from '@/queries/teams/updateTeamById';
import { deleteTeamById } from '@/queries/teams/deleteTeamById';

export function useTeamMutations() {
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: createTeam, // 使用查詢函數
    onMutate: async (newTeam) => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      
      const currentTeams = queryClient.getQueryData<Team[]>(['teams']) || [];
      
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
      if (context?.currentTeams) {
        queryClient.setQueryData(['teams'], context.currentTeams);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: ({ teamId, data }: { teamId: string; data: CreateTeamRequest }) => 
      updateTeamById(teamId, data),
    onMutate: async ({ teamId, data }) => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      await queryClient.cancelQueries({ queryKey: ['team', teamId] });
      
      // 取得目前快取中的團隊列表。如果沒有資料，則預設為空陣列。
      const currentTeams = queryClient.getQueryData<Team[]>(['teams']) || [];
      // 取得目前快取中的單一團隊資料。如果沒有資料，則為 `undefined`。
      const currentTeam = queryClient.getQueryData<Team>(['team', teamId]);
      
      // 建立一個新的團隊列表。如果團隊的 `id` 等於 `teamId`，就用新資料（`data`）和當前時間（`updatedAt`）更新該團隊；否則保持原樣。
      const updatedTeams = currentTeams.map(team => 
        team.id === teamId 
          ? { 
              ...team, 
              ...data, 
              updatedAt: new Date() 
            }
          : team
      );
      queryClient.setQueryData<Team[]>(['teams'], updatedTeams);
      // 將更新後的 團隊列表 寫回快取，讓 UI 立即反映變更（樂觀更新）。
      
      if (currentTeam) {
        const updatedTeam = { 
          ...currentTeam, 
          ...data, 
          updatedAt: new Date() 
        };
        queryClient.setQueryData(['team', teamId], updatedTeam);
        // 如果有該 團隊 的快取資料，則用新資料和當前時間更新該團隊，並寫回快取。
      }
      
      return { currentTeams, currentTeam };
    },
    onError: (err, { teamId }, context) => {
      if (context?.currentTeams) {
        queryClient.setQueryData(['teams'], context.currentTeams);
      }
      if (context?.currentTeam) {
        queryClient.setQueryData(['team', teamId], context.currentTeam);
      }
    },
    onSettled: (data, error, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team', teamId] });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeamById, // 使用查詢函數
    onMutate: async (teamId) => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      
      const currentTeams = queryClient.getQueryData<Team[]>(['teams']) || [];
      
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
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  return {
    createTeam: createTeamMutation.mutate,
    updateTeam: updateTeamMutation.mutateAsync,
    deleteTeam: deleteTeamMutation.mutate,
    isCreating: createTeamMutation.isPending,
    isUpdating: updateTeamMutation.isPending,
    isDeleting: deleteTeamMutation.isPending,
    createError: createTeamMutation.error,
    updateError: updateTeamMutation.error,
    deleteError: deleteTeamMutation.error,
  };
}