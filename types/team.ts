export interface Team {
  id: string;
  name: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamRequest {
  name: string;
  members: string[];
}