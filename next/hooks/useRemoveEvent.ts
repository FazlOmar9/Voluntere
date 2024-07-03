import apiClient from '@/services/apiClient';

const useRemoveEvent = (
  eventId: string,
  communityId: string,
  callback: () => void
) => {
  apiClient.delete(`/event/${eventId}`).then(() => {
    apiClient.put(`/community/rmevent/${communityId}`, { eventId }).then(() => {
      callback();
    });
  });
};

export default useRemoveEvent;
