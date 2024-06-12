import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/apiClient';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  venue: string;
  community: string;
  volunteers: string[];
  status: 'Upcoming' | 'Live' | 'Closed' | 'Cancelled' | 'Ended';
}

const useEvent = () => {
  const fetchEvents = () =>
    apiClient.get<Event[]>('/event/?limit=20').then((res) => res.data);

  return useQuery({
    queryKey: ['event'],
    queryFn: fetchEvents,
  });
};

export default useEvent;
