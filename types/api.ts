import { Team } from "./team";

// Spring Boot API 統一回傳格式
export interface ApiResponse<T = unknown> {
  result: boolean;
  errorCode: string;
  message: string;
  data: T;
}

// 團隊相關的 API 請求/回應類型
export interface TeamsListResponse {
  teams: Team[];
  total: number;
}

export interface TeamDetailResponse {
  team: Team;
}

export interface CreateTeamResponse {
  team: Team;
}

export interface DeleteTeamResponse {
  deletedTeamId: string;
}