import { Team } from '@/types/team';

// 模擬資料庫 - 實際專案中請使用真實資料庫
const mockTeams: Team[] = [
  {
    id: '1',
    name: '前端開發團隊',
    members: ['張三', '李四', '王五'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '後端開發團隊',
    members: ['趙六', '孫七'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

export const db = {
  team: {
    findMany: async (): Promise<Team[]> => {
      // 模擬網路延遲
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockTeams;
    },
    findById: async (id: string): Promise<Team | null> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockTeams.find(team => team.id === id) || null;
    },
    create: async (data: { name: string; members: string[] }): Promise<Team> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const newTeam: Team = {
        id: Date.now().toString(),
        name: data.name,
        members: data.members,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTeams.push(newTeam);
      return newTeam;
    },
    delete: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 150));
      const index = mockTeams.findIndex(team => team.id === id);
      if (index > -1) {
        mockTeams.splice(index, 1);
        return true;
      }
      return false;
    },
  },
};