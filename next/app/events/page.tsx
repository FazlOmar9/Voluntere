import EventList from '@/components/event/EventList';
import { fetchEvents } from '@/hooks/useEvent';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventList />
    </HydrationBoundary>
  );
};

export default page;
