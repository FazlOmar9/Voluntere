'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import useEvent from '../../hooks/useEvent';
import CardSkeleton from '../community/CardSkeleton';
import EventCard from '../event/EventCard';
import { ChevronRightIcon } from '@chakra-ui/icons';
import useSingleCommunity from '@/hooks/useSingleCommunity';

const CommunityEventsPage = ({ community }: { community?: string }) => {
  const { data: events, isLoading } = useEvent(community);
  const { data: com } = useSingleCommunity(community || '');

  return (
    <>
      <Breadcrumb
        spacing='8px'
        separator={<ChevronRightIcon color='gray.500' />}
        p='10px'
        fontSize='xl'
        fontWeight='bold'
      >
        <BreadcrumbItem>
          <BreadcrumbLink href='/communities'>Communities</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/communities/${community}`}
            isTruncated
            width={'150px'}
          >
            {com?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/communities/${community}/events`}>Events</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
        padding='10px'
        spacing={6}
      >
        {isLoading
          ? Array(20)
              .fill(0)
              .map((_, index) => <CardSkeleton key={index} />)
          : events?.map((event, index) => (
              <EventCard key={index}>{event}</EventCard>
            ))}
      </SimpleGrid>
    </>
  );
};

export default CommunityEventsPage;
