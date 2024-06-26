import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/apiClient';

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  venue: string;
  requirement: number;
  community: string;
  volunteers: string[];
  status: 'Upcoming' | 'Live' | 'Closed' | 'Cancelled' | 'Ended';
}

export const fetchEvents = () =>
  apiClient.get<Event[]>('/event/?limit=20').then((res) => res.data);

const useEvent = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};

export default useEvent;
