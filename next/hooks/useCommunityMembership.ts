import apiClient from '@/services/apiClient';

export const addMember = async (
  communityId: string | null,
  username: string | null,
  uid: string | null,
  callback?: () => void
) => {
  await apiClient
    .put(`/community/${communityId}`, { member: uid })
    .then(async () => {
      await apiClient.put(`/user/`, { username, community: communityId });
    })
    .finally(() => {
      if (callback) callback();
    });
};

export const removeMember = async (
  communityId: string | null,
  username: string | null,
  uid: string | null,
  callback?: () => void
) => {
  await apiClient
    .put(`/community/rmuser/${communityId}`, { userId: uid })
    .then(async () => {
      await apiClient.put(`/user/rmcommunity/`, { username, communityId });
    })
    .finally(() => {
      if (callback) callback();
    });
};
