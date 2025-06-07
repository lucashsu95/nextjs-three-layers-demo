'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTeamsData } from '@/hooks/teams/useTeamsData';
import { Team } from '@/types/team';

interface OrganizationContextValue {
  teams: Team[];
  isLoadingTeams: boolean;
  error: Error | null;
  refetch: () => void;
}

const OrganizationContext = createContext<OrganizationContextValue | null>(null);

interface OrganizationProviderProps {
  children: ReactNode;
  initialTeams?: Team[];
}

export function OrganizationProvider({ children, initialTeams }: OrganizationProviderProps) {
  const { data: teams = [], isLoading, error, refetch } = useTeamsData(initialTeams);

  const value: OrganizationContextValue = {
    teams,
    isLoadingTeams: isLoading,
    error,
    refetch,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider');
  }
  return context;
}