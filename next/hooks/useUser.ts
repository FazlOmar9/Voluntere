import { UserData } from '@/app/api/auth/[...nextauth]/auth';
import apiClient from '@/services/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Event } from './useEvent';
import { Community } from './useCommunity';

interface UserDetailed {
  _id: string;
  name: string;
  username: string;
  events: Event[];
  communities: Community[];
  profileImage: string;
  email: string;
}

const useUser = (username: string) => {
  const fetchUser = (username: string) =>
    apiClient.get<UserDetailed>(`/user/detailed/${username}`).then((res) => {
      return res.data;
    });

  return useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username),
  });
};

export default useUser;
