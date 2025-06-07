import { NextRequest, NextResponse } from 'next/server';
import { getAllTeams } from '@/queries/teams/getAllTeams';
import { createTeam } from '@/queries/teams/createTeam';

// 這些 Next.js API 路由是可選的
// 如果您想直接從客戶端呼叫 Spring Boot API，可以跳過這些檔案
// 或者用這些路由作為代理層，添加驗證、日誌等功能

export async function GET() {
  try {
    const teams = await getAllTeams();
    return NextResponse.json({
      result: true,
      errorCode: '',
      message: '成功獲取團隊列表',
      data: { teams, total: teams.length }
    });
  } catch (error) {
    return NextResponse.json({
      result: false,
      errorCode: 'FETCH_TEAMS_ERROR',
      message: error instanceof Error ? error.message : '獲取團隊列表失敗',
      data: null
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const team = await createTeam(data);
    return NextResponse.json({
      result: true,
      errorCode: '',
      message: '成功建立團隊',
      data: { team }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      result: false,
      errorCode: 'CREATE_TEAM_ERROR',
      message: error instanceof Error ? error.message : '建立團隊失敗',
      data: null
    }, { status: 500 });
  }
}