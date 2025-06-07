import { TeamDetail } from '@/app/components/TeamDetail';
import { getTeamById } from '@/queries/teams/getTeamById';
import { notFound } from 'next/navigation';

interface TeamPageProps {
  params: Promise<{
    teamId: string;
  }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  try {
    const { teamId } = await params;
    const team = await getTeamById(teamId);
    
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <TeamDetail initialTeam={team} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('無法獲取團隊詳情:', error);
    notFound();
  }
}