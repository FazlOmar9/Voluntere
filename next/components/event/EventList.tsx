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
import EventCard from './EventCard';
import { ChevronRightIcon } from '@chakra-ui/icons';

const EventList = () => {
  const { data: events, isLoading } = useEvent();

  return (
    <>
      <Breadcrumb
        spacing='8px'
        separator={<ChevronRightIcon color='gray.500' />}
        fontSize='xl'
        fontWeight='bold'
        p='10px'
      >
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/events'>Events</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ base:1, sm: 2, md: 3, lg: 4, xl: 5}}
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

export default EventList;
