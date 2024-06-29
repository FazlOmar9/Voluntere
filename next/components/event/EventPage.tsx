'use client';

import useSingleEvent from '@/hooks/useSingleEvent';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import EventBadge from './EventBadge';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addMember, removeMember } from '@/hooks/useEventMembership';
import { ChevronRightIcon } from '@chakra-ui/icons';

const EventPage = ({ id }: { id: string }) => {
  const { data: event, isLoading } = useSingleEvent(id);
  const { data: session, status } = useSession();

  const [isMember, setIsMember] = useState<boolean>(false);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    if (event) {
      setIsMember(
        event?.volunteers.includes(session?.user?.image || '') || false
      );
    }
  }, [event, session]);
  const date = new Date(event?.date || '');

  if (isLoading)
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  const handleClick = () => {
    const successCallback = () => {
      setIsMember(!isMember);
      setIsBtnLoading(false);
    };

    setIsBtnLoading(true);
    isMember
      ? removeMember(
          event?._id || '',
          session?.user?.name || '',
          session?.user?.image || '',
          successCallback
        )
      : addMember(
          event?._id || '',
          session?.user?.name || '',
          session?.user?.image || '',
          successCallback
        );
  };

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
          <BreadcrumbLink href='/events'>Events</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/events/${id}`} isTruncated width={'150px'}>
            {event?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider borderColor='gray.400' />
      <Box p='20px 10px 10px 10px' minH='100vh'>
        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }}>
          <Card maxW='900px' bgColor='rgba(0, 0, 0, 0.05)'>
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
              <Heading size='md' pb='10px'>
                About
              </Heading>
              <Text>{event?.description}</Text>
            </CardBody>
          </Card>
          <Card
            w={{ base: '100%', md: '100%', lg: '500px' }}
            maxW='500px'
            bgColor='rgba(0, 0, 0, 0.05)'
          >
            <CardBody>
              <Stack spacing={'100px'} direction={'column'}>
                <Stack spacing={3} direction={'column'}>
                  <Heading size='sm' fontWeight='normal'>
                    Venue: <Text fontWeight='bold'>{event?.venue}</Text>
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Date:{' '}
                    <Text fontWeight='bold'>
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
                  <EventBadge width='100px' status={event?.status || 'Live'} />
                </Stack>
                <Stack alignItems={'center'}>
                  {status === 'authenticated' ? (
                    <Button
                      colorScheme={isMember ? 'red' : 'green'}
                      w={{ base: '', md: '', lg: '220px' }}
                      minW={{ base: '100%', md: '100%', lg: '220px' }}
                      isLoading={isBtnLoading}
                      onClick={handleClick}
                      isDisabled={session?.user?.email === '1'}
                    >
                      {isMember ? 'Leave' : 'Join'}
                    </Button>
                  ) : (
                    <Button
                      colorScheme='green'
                      w={{ base: '', md: '', lg: '220px' }}
                      minW={{ base: '100%', md: '100%', lg: '220px' }}
                      isLoading={status === 'loading'}
                      as={Link}
                      href={'/signin'}
                    >
                      Sign in to Join
                    </Button>
                  )}
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default EventPage;
