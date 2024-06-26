'use client';

import useSingleEvent from '@/hooks/useSingleEvent';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import EventBadge from './EventBadge';

const EventPage = ({ id }: { id: string }) => {
  const { data: event } = useSingleEvent(id);
  const date = new Date(event?.date || '');

  return (
    <>
      <Box p='20px 10px 10px 20px' minH='100vh'>
      <Stack direction={{base: 'column', md: 'column', lg: 'row'}}alignItems='stretch'>
      <Card p='10px 10px 10px 10px' maxW='900px' bgColor='rgba(0, 0, 0, 0.05)'>
            <CardHeader borderBottom='1px'>
              <Stack
                justifyContent='space-between'
                direction={{ base: 'column', md: 'column', lg: 'row' }}
                alignItems={{ base: 'center', md: 'center', lg: 'end' }}
              >
                <Image
                  src='https://placehold.co/600x400'
                  alt='event image'
                  height='200px'
                  pr={{ base: '0', lg: '200px' }}
                />
                <Stack>
                  <Heading size='xl' pt='10px'>
                    {event?.name}
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Registered Volunteers
                    <Text fontWeight='bold'>
                      {event?.volunteers.length}/{event?.requirement}
                    </Text>
                  </Heading>
                </Stack>
              </Stack>
            </CardHeader>
            <CardBody>
              <Heading size='md'>About</Heading>
              <Text>{event?.description}</Text>
            </CardBody>
          </Card>
          <Card
            p='10px 10px 10px 10px'
            maxW='500px'
            bgColor='rgba(0, 0, 0, 0.05)'
          >
            <CardBody pr="100px">
                  <Heading size='sm' fontWeight='normal'>
                    Venue:{' '}
                    <Text fontWeight='bold' pb='10px'>
                      {event?.venue}
                    </Text>
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Date:{' '}
                    <Text fontWeight='bold' pb='10px'>
                      {date.getDate() +
                        ' ' +
                        date.toLocaleString('default', { month: 'long' }) +
                        ' ' +
                        date.getFullYear()}
                    </Text>
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Time:{' '}
                    <Text fontWeight='bold' pb='10px'>
                      {date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </Text>
                  </Heading>
                <EventBadge status={event?.status || 'Live'} />
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default EventPage;
