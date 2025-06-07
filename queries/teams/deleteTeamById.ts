import { db } from '@/lib/db';

export async function deleteTeamById(id: string): Promise<boolean> {
  try {
    const result = await db.team.delete(id);
    return result;
  } catch (error) {
    console.error('Failed to delete team:', error);
    throw new Error('Failed to delete team');
  }
}