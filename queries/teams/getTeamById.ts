import { apiGet } from '@/lib/api';
import { Team } from '@/types/team';
import { TeamDetailResponse } from '@/types/api';

export async function getTeamById(id: string): Promise<Team> {
  try {
    const response = await apiGet<TeamDetailResponse>(`/teams/${id}`);
    return response.team;
  } catch (error) {
    console.error('Failed to fetch team:', error);
    throw new Error('無法獲取團隊詳情');
  }
}