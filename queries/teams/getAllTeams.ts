import { db } from '@/lib/db';
import { Team } from '@/types/team';

export async function getAllTeams(): Promise<Team[]> {
  try {
    const teams = await db.team.findMany();
    return teams;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw new Error('Failed to fetch teams');
  }
}