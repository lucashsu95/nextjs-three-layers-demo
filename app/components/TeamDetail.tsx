'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Team, CreateTeamRequest } from '@/types/team';
import { useTeamDetail } from '@/hooks/teams/useTeamDetail';
import { useTeamMutations } from '@/hooks/teams/useTeamMutations';
import { LoadingState } from '@/app/ui/loading-state';
import { ErrorState } from '@/app/ui/error-state';
import { TeamEditForm } from './TeamEditForm';

interface TeamDetailProps {
  teamId: string;
  initialTeam: Team;
}

export function TeamDetail({ teamId, initialTeam }: TeamDetailProps) {
  const router = useRouter();
  
  const { data: team, isLoading, error, refetch } = useTeamDetail(teamId, initialTeam);
  const { updateTeam, deleteTeam, isUpdating, isDeleting } = useTeamMutations();
  
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (data: CreateTeamRequest) => {
    try {
      await updateTeam({ teamId, data });
      setIsEditing(false);
    } catch (error) {
      console.error('更新失敗:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('確定要刪除這個團隊嗎？')) {
      try {
        await deleteTeam(teamId);
        router.push('/');
      } catch (error) {
        console.error('刪除失敗:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (error) {
    return <ErrorState message="無法載入團隊詳情" onRetry={refetch} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!team) {
    return <div className="text-center py-8">團隊不存在</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 返回按鈕 */}
      <button
        onClick={() => router.back()}
        className="cursor-pointer mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← 返回
      </button>

      {/* 編輯模式 */}
      {isEditing ? (
        <TeamEditForm
          team={team}
          onSave={handleSave}
          onCancel={handleCancelEdit}
          isLoading={isUpdating}
        />
      ) : (
        /* 查看模式 */
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{team.name}</h1>
              <p className="text-gray-600">
                建立時間: {new Date(team.createdAt).toLocaleDateString('zh-TW')}
              </p>
              <p className="text-gray-600">
                更新時間: {new Date(team.updatedAt).toLocaleDateString('zh-TW')}
              </p>
            </div>
            
            {/* 操作按鈕 */}
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                disabled={isUpdating || isDeleting}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                編輯
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting || isUpdating}
                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? '刪除中...' : '刪除'}
              </button>
            </div>
          </div>

          {/* 團隊成員 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              團隊成員 ({team.members.length})
            </h2>
            
            {team.members.length === 0 ? (
              <p className="text-gray-500">目前沒有成員</p>
            ) : (
              <div className="grid gap-2">
                {team.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {member.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-800">{member}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}