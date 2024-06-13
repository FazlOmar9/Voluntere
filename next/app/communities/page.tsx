import CommunityList from '@/components/CommunityList';
import { fetchCommunities } from '@/hooks/useCommunity';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityList />
    </HydrationBoundary>
  );
};

export default page;
