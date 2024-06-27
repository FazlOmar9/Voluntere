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
      console.log('Added member');
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
      if (callback) {
        callback();
        console.log('Removed member');
      }
    });
};

// const useJoinCommunity = (
//   communityId: string | undefined,
//   username: string | undefined,
//   uid: string | undefined,
//   action: boolean | undefined
// ) => {
//   const [msg, setMsg] = useState<string | null>('Join');

//   useEffect(() => {
//     if (!communityId || !username || !uid || !action) return;

//     if (action) setMsg('Join');
//     else setMsg('Leave');
//   }, []);

//   return { msg };
// };

// export default useJoinCommunity;
