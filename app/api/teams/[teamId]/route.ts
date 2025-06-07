import { NextRequest, NextResponse } from 'next/server';
import { deleteTeamById } from '@/queries/teams/deleteTeamById';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const success = await deleteTeamById(params.teamId);
    if (success) {
      return NextResponse.json({ message: 'Team deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Failed to delete team:', error);
    return NextResponse.json(
      { error: 'Failed to delete team' },
      { status: 500 }
    );
  }
}