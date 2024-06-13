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
export const fetchCommunities = () =>
  apiClient.get<Community[]>('/community?limit=20').then((res) => res.data);

const useCommunity = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });
};

export default useCommunity;
