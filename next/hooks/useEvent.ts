import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/apiClient';

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  venue: string;
  requirement: number;
  banner: string;
  community: string;
  volunteers: string[];
  status: 'Upcoming' | 'Live' | 'Closed' | 'Cancelled' | 'Ended';
}

export const fetchEvents = (community?: string, limit?: number) => {
  if (community === '') return;

  return apiClient
    .get<Event[]>('/event', {
      params: { limit: limit || 1000, community },
    })
    .then((res) => res.data);
};

const useEvent = (community?: string, limit?: number) => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(community, limit),
    enabled: community === '' ? !!community : true,
  });
};

export default useEvent;
