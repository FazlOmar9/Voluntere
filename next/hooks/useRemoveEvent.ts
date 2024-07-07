import apiClient from '@/services/apiClient';
import { useState } from 'react';

const useRemoveEvent = (
  eventId: string,
  communityId: string,
  callback: () => void,
  setIsLoading: (value: boolean) => void
) => {

  if (!eventId || !communityId) return;
  setIsLoading(true);

  apiClient.delete(`/event/${eventId}`).then(() => {
    apiClient
      .put(`/community/rmevent/${communityId}`, { eventId })
      .then(() => callback())
      .finally(() => setIsLoading(false));
  });
};

export default useRemoveEvent;
