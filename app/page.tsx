import { getAllTeams } from '@/queries/teams/getAllTeams';
import { TeamList } from './components/TeamList';
import { OrganizationProvider } from '@/context/OrganizationContext';

export default async function Page() {
  // 第一層：在伺服器端獲取初始數據
  const initialTeams = await getAllTeams();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          團隊管理系統
        </h1>
        
        {/* 通過 context 將伺服器數據傳遞給 React Query */}
        <OrganizationProvider initialTeams={initialTeams}>
          <TeamList />
        </OrganizationProvider>
      </div>
    </main>
  );
}