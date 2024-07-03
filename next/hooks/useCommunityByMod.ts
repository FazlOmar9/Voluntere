import apiClient from '@/services/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Community } from './useCommunity';

const useCommunityByMod = (id: string) => {
  const fetchSingleCommunity = () => {
    if (id)
      return apiClient
        .get<Community>(`/community/mod/${id}`)
        .then((res) => res.data);
    return null;
  };

  return useQuery({
    queryKey: ['community', id],
    queryFn: fetchSingleCommunity,
    enabled: !!id,
  });
};

export default useCommunityByMod;
