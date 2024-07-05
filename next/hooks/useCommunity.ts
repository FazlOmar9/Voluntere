import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

export interface Community {
  _id: string;
  name: string;
  description: string;
  events: string[];
  mod: string;
  members: string[];
  banner: string;
}
export const fetchCommunities = () =>
  apiClient
    .get<Community[]>('/community', {
      params: { limit: 1000 },
    })
    .then((res) => res.data);

const useCommunity = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });
};

export default useCommunity;
