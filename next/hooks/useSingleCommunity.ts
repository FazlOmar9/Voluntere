import apiClient from '@/services/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Community } from './useCommunity';

const useSingleCommunity = (id: string) => {
  const fetchSingleCommunity = () => {
    return apiClient.get<Community>(`/community/${id}`).then((res) => res.data);
  };

  return useQuery({
    queryKey: ['community', id],
    queryFn: fetchSingleCommunity,
  });
};

export default useSingleCommunity;
