import apiClient from '@/services/apiClient';
import { Event } from './useEvent';
import { useQuery } from '@tanstack/react-query';

const useEventList = (id: string) => {
  const fetchEvents = (id: string) =>{
    return apiClient
      .get<Event[]>(`/event`, { params: {
        limit: 5,
        community: id,
      }})
      .then((res) => res.data);}

  return useQuery({
    queryKey: ['community-events'],
    queryFn: () => fetchEvents(id),
  });
};

export default useEventList;
