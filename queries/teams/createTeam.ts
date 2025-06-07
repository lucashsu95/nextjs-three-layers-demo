import { apiPost } from '@/lib/api';
import { Team, CreateTeamRequest } from '@/types/team';
import { CreateTeamResponse } from '@/types/api';

export async function createTeam(data: CreateTeamRequest): Promise<Team> {
  try {
    // 呼叫 Spring Boot API: POST /api/teams
    const response = await apiPost<CreateTeamResponse>('/teams', data);
    return response.team;
  } catch (error) {
    console.error('Failed to create team:', error);
    throw new Error('無法建立團隊');
  }
}