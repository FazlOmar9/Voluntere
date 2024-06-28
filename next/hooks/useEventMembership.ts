import apiClient from '@/services/apiClient';

export const addMember = async (
  eventId: string | null,
  username: string | null,
  uid: string | null,
  callback?: () => void
) => {
  await apiClient
    .put(`/event/${eventId}`, { volunteer: uid })
    .then(async () => {
      await apiClient.put(`/user/`, { username, event: eventId });
    })
    .finally(() => {
      if (callback) callback();
    });
};

export const removeMember = async (
  eventId: string | null,
  username: string | null,
  uid: string | null,
  callback?: () => void
) => {
  await apiClient
    .put(`/event/rmuser/${eventId}`, { userId: uid })
    .then(async () => {
      await apiClient.put(`/user/rmevent/`, { username, eventId });
    })
    .finally(() => {
      if (callback) callback();
    });
};
