import { NextRequest, NextResponse } from 'next/server';
import { getTeamById } from '@/queries/teams/getTeamById';
import { updateTeamById } from '@/queries/teams/updateTeamById';
import { deleteTeamById } from '@/queries/teams/deleteTeamById';

export async function GET(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const team = await getTeamById(params.teamId);
    return NextResponse.json({
      result: true,
      errorCode: '',
      message: '成功獲取團隊詳情',
      data: { team }
    });
  } catch (error) {
    return NextResponse.json({
      result: false,
      errorCode: 'FETCH_TEAM_ERROR',
      message: error instanceof Error ? error.message : '獲取團隊詳情失敗',
      data: null
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const data = await request.json();
    const team = await updateTeamById(params.teamId, data);
    return NextResponse.json({
      result: true,
      errorCode: '',
      message: '成功更新團隊',
      data: { team }
    });
  } catch (error) {
    return NextResponse.json({
      result: false,
      errorCode: 'UPDATE_TEAM_ERROR',
      message: error instanceof Error ? error.message : '更新團隊失敗',
      data: null
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const deletedTeamId = await deleteTeamById(params.teamId);
    return NextResponse.json({
      result: true,
      errorCode: '',
      message: '成功刪除團隊',
      data: { deletedTeamId }
    });
  } catch (error) {
    return NextResponse.json({
      result: false,
      errorCode: 'DELETE_TEAM_ERROR',
      message: error instanceof Error ? error.message : '刪除團隊失敗',
      data: null
    }, { status: 500 });
  }
}