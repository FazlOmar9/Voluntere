'use client';

import {
  Divider,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { Event } from '../../hooks/useEvent';
import EventCard from '../event/EventCard';

const UserEvents = ({
  events,
  back,
}: {
  events: Event[];
  back: () => void;
}) => {
  return (
    <>
      <HStack spacing={5} p={2}>
        <IconButton
          aria-label='Go back'
          icon={<FaArrowLeft />}
          onClick={() => back()}
          variant={'ghost'}
        />
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Your Events
        </Text>
      </HStack>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
        padding='10px'
        spacing={6}
      >
        {events?.map((event, index) => (
          <EventCard key={index}>{event}</EventCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserEvents;
