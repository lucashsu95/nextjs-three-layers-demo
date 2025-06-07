'use client';

import { useState } from 'react';
import { useOrganization } from '@/context/OrganizationContext';
import { useTeamMutations } from '@/hooks/teams/useTeamMutations';
import { TeamCard } from './TeamCard';
import { LoadingState } from '@/app/ui/loading-state';
import { ErrorState } from '@/app/ui/error-state';

export function TeamList() {
  const {teams, isLoadingTeams, error, refetch } = useOrganization();
  const { createTeam, isCreating } = useTeamMutations();
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState('');

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const members = newTeamMembers
      .split(',')
      .map(member => member.trim())
      .filter(member => member.length > 0);

    createTeam({
      name: newTeamName.trim(),
      members,
    });

    setNewTeamName('');
    setNewTeamMembers('');
  };

  if (error) {
    return <ErrorState message="無法載入團隊資料" onRetry={refetch} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">建立新團隊</h2>
        <form onSubmit={handleCreateTeam} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
              團隊名稱
            </label>
            <input
              id="teamName"
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="輸入團隊名稱"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700 mb-2">
              團隊成員 (用逗號分隔)
            </label>
            <input
              id="teamMembers"
              type="text"
              value={newTeamMembers}
              onChange={(e) => setNewTeamMembers(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="張三, 李四, 王五"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || !newTeamName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? '建立中...' : '建立團隊'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">團隊列表</h2>
        {isLoadingTeams ? (
          <LoadingState />
        ) : teams.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            目前沒有團隊，建立第一個團隊吧！
          </div>
        ) : (
          <div className="grid gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}