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

export const fetchEvents = (community?: string) =>
  apiClient
    .get<Event[]>('/event', {
      params: { limit: 20, community },
    })
    .then((res) => res.data);

const useEvent = (community?: string) => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(community),
  });
};

export default useEvent;
