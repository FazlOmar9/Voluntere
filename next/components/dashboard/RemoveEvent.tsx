'use client';

import useCommunityByMod from '@/hooks/useCommunityByMod';
import useEvent from '@/hooks/useEvent';
import {
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import EventBadge from '../event/EventBadge';
import { FaRegTrashAlt } from 'react-icons/fa';
import useRemoveEvent from '@/hooks/useRemoveEvent';

const RemoveEvent = () => {
  const { data: session, status } = useSession();
  const { data: community } = useCommunityByMod(session?.user?.image || '');
  const { data: events, refetch } = useEvent(community?._id || '', 1000);

  if (status === 'loading')
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  const handleClick = (eventId: string) => {
    useRemoveEvent(eventId, community?._id || '', refetch);
  };

  return (
    <Box p='10px 10px 10px 10px' minH={'100vh'}>
      <Heading mb={3}>Remove event</Heading>
      <Divider borderColor='gray.400' />
      <Table variant={'striped'} colorScheme='gray' mt={5}>
        <Tbody>
          {events?.map((event, ind) => (
            <Tr key={ind}>
              <Td>
                <Heading size={'sm'}>{event.name}</Heading>
                <Text
                  isTruncated
                  w={{ base: '150px', md: '250px', lg: '700px' }}
                >
                  {event.description}
                </Text>
              </Td>
              <Td display={{ base: 'none', sm: 'table-cell' }}>
                <EventBadge status={event.status} />
              </Td>
              <Td alignItems={'end'}>
                <IconButton
                  aria-label='Go back'
                  icon={<FaRegTrashAlt />}
                  colorScheme='red'
                  onClick={() => handleClick(event._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RemoveEvent;
