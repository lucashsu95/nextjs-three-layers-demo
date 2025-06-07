import { apiDelete } from '@/lib/api';
import { DeleteTeamResponse } from '@/types/api';

export async function deleteTeamById(id: string): Promise<string> {
  try {
    const response = await apiDelete<DeleteTeamResponse>(`/teams/${id}`);
    return response.deletedTeamId;
  } catch (error) {
    console.error('Failed to delete team:', error);
    throw new Error('無法刪除團隊');
  }
}