"use client";

import { useTeamMutations } from "@/hooks/teams/useTeamMutations";
import { Team } from "@/types/team";
import { useRouter } from "next/navigation";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const { deleteTeam, isDeleting } = useTeamMutations();
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm(`確定要刪除 ${team.name} 嗎？`)) {
      deleteTeam(team.id);
    }
  };

  const handleView = () => {
    router.push(`/teams/${team.id}`);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
      <p className="text-gray-600 mb-2">成員數量: {team.members.length}</p>
      <div className="mb-2">
        <span className="text-sm text-gray-500">成員: </span>
        <span className="text-sm text-gray-700">{team.members.join(", ")}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          建立時間: {new Date(team.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleView}
            className="px-3 py-1 cursor-pointer bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            查看
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 cursor-pointer bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "刪除中..." : "刪除"}
          </button>
        </div>
      </div>
    </div>
  );
}
