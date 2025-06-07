import { NextRequest, NextResponse } from 'next/server';
import { getAllTeams } from '@/queries/teams/getAllTeams';
import { createTeam } from '@/queries/teams/createTeam';

export async function GET() {
  try {
    const teams = await getAllTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Team creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const team = await createTeam(data);
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Team creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}