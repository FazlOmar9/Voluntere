import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

export interface Community {
  id: string;
  name: string;
  description: string;
  events: [string];
  mod: string;
  members: [string];
}

const useCommunity = () => {
  const fetchCommunities = () =>
    apiClient.get<Community[]>('/community?limit=20').then((res) => res.data);

  return useQuery({
    queryKey: ['community'],
    queryFn: fetchCommunities,
  });
};

export default useCommunity;
