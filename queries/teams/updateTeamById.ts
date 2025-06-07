import { apiPut } from '@/lib/api';
import { Team, CreateTeamRequest } from '@/types/team';
import { TeamDetailResponse } from '@/types/api';

export async function updateTeamById(id: string, data: CreateTeamRequest): Promise<Team> {
  try {
    const response = await apiPut<TeamDetailResponse>(`/teams/${id}`, data);
    return response.team;
  } catch (error) {
    console.error('Failed to update team:', error);
    throw new Error('無法更新團隊');
  }
}