import apiClient from '@/services/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Event } from './useEvent';

const useSingleEvent = (id: string) => {
  const fetchSingleEvent = () => {
    return apiClient.get<Event>(`/event/${id}`).then((res) => {
      return res.data;
    });
  };

  return useQuery({
    queryKey: ['event', id],
    queryFn: fetchSingleEvent,
  });
};

export default useSingleEvent;
