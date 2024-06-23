'use client';

import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import useEvent from '../../hooks/useEvent';
import CardSkeleton from '../community/CardSkeleton';
import EventCard from './EventCard';

const EventList = () => {
  const { data: events, error, isLoading } = useEvent();

  // if (error) throw new Error(error.message);
  // TODO: Handle error
  if (error) console.log(error.message);

  return (
    <>
      <Heading p='20px'>Events</Heading>
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

export default EventList;
