import { useState } from 'react';
import { Team, CreateTeamRequest } from '@/types/team';

interface TeamEditFormProps {
  team: Team;
  onSave: (data: CreateTeamRequest) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function TeamEditForm({ team, onSave, onCancel, isLoading }: TeamEditFormProps) {
  const [name, setName] = useState(team.name);
  const [members, setMembers] = useState(team.members.join(', '));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const membersList = members
      .split(',')
      .map(member => member.trim())
      .filter(member => member.length > 0);

    await onSave({
      name: name.trim(),
      members: membersList,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">編輯團隊</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
            團隊名稱
          </label>
          <input
            id="teamName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入團隊名稱"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700 mb-2">
            團隊成員 (用逗號分隔)
          </label>
          <input
            id="teamMembers"
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="張三, 李四, 王五"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '儲存中...' : '儲存變更'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}