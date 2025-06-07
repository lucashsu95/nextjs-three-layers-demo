import { db } from '@/lib/db';
import { Team, CreateTeamRequest } from '@/types/team';

export async function createTeam(data: CreateTeamRequest): Promise<Team> {
  try {
    const team = await db.team.create(data);
    return team;
  } catch (error) {
    console.error('Failed to create team:', error);
    throw new Error('Failed to create team');
  }
}