import { apiGet } from '@/lib/api';
import { Team } from '@/types/team';
import { TeamsListResponse } from '@/types/api';

export async function getAllTeams(): Promise<Team[]> {
  try {
    const response = await apiGet<TeamsListResponse>('/teams');
    return response.teams;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw new Error('無法獲取團隊列表');
  }
}