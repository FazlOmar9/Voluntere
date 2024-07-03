import apiClient from '@/services/apiClient';
import { Event } from './useEvent';
import { useQuery } from '@tanstack/react-query';

const useEventList = (id: string) => {
  const fetchEvents = (id: string) => {
    if (id)
      return apiClient
        .get<Event[]>(`/event`, {
          params: {
            limit: 5,
            community: id,
          },
        })
        .then((res) => res.data);
    return null;
  };

  return useQuery({
    queryKey: ['community-events'],
    queryFn: () => fetchEvents(id),
    enabled: !!id,
  });
};

export default useEventList;
