import apiClient from '@/services/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Event } from './useEvent';

const useSingleEvent = (id: string) => {
  const fetchSingleEvent = () => {
    console.log('fetchSingleEvent');
    return apiClient.get<Event>(`/event/${id}`).then((res) => res.data);
  };

  return useQuery({
    queryKey: ['event', id],
    queryFn: fetchSingleEvent,
  });
};

export default useSingleEvent;
