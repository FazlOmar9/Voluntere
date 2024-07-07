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
  Select,
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
import useSingleCommunity from '@/hooks/useSingleCommunity';
import imageApiClient from '@/services/imageApiClient';
import apiClient from '@/services/apiClient';

const EventPage = ({ id }: { id: string }) => {
  const { data: event, isLoading, error, refetch } = useSingleEvent(id);
  const { data: community } = useSingleCommunity(event?.community || '');
  const { data: session, status } = useSession();

  const [isMember, setIsMember] = useState<boolean>(false);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [eventStatus, setEventStatus] = useState<string>('');

  useEffect(() => {
    if (event) {
      setIsMember(
        event?.volunteers.includes(session?.user?.image || '') || false
      );
      setEventStatus(event?.status);
    }
  }, [event, session]);
  const date = new Date(event?.date || '');

  useEffect(() => {
    if (event?.status === eventStatus) return;
    if (!eventStatus || !event) return;
    apiClient.put(`/event/${event._id}`, { status: eventStatus });
  }, [eventStatus, event]);

  if (isLoading)
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  if (error)
    return (
      <Flex
        minH={'100vh'}
        justifyContent='center'
        alignItems='center'
        bg='black'
        color='white'
      >
        Page Not Found
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

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    formData.append('type', 'event');
    if (session && session.user && event) formData.append('id', event._id);

    if (fileInput.files && (fileInput.files || []).length > 0) {
      formData.append('file', fileInput.files[0]);

      try {
        const response = await imageApiClient.post('/', formData);

        if (response.status === 200) {
          setShowEdit(false);
          refetch();
          console.log('File uploaded successfully');
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  let isOwner = false;
  if (community) {
    isOwner = community?.mod === session?.user?.image;
  }

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
                <Stack>
                  <Image
                    crossOrigin='anonymous'
                    src={event?.banner || 'https://placehold.co/600x400'}
                    alt='event image'
                    width='300px'
                    height='200px'
                    mr={{ base: '0', lg: '200px' }}
                    objectFit='cover'
                  />
                  <Box display={isOwner ? 'block' : 'none'}>
                    <Button
                      variant={'link'}
                      color={'blue.800'}
                      mt={2}
                      onClick={() => setShowEdit((r) => !r)}
                    >
                      {showEdit ? 'Cancel' : 'Change image'}
                    </Button>
                    <Box display={showEdit ? 'block' : 'none'}>
                      <form
                        encType='multipart/form-data'
                        onSubmit={handleImageSubmit}
                      >
                        <input
                          type='file'
                          name='file'
                          accept='image/png, image/jpeg'
                        />
                        <Button
                          size={'sm'}
                          colorScheme='blackAlpha'
                          type='submit'
                          mt={1}
                        >
                          Submit
                        </Button>
                      </form>
                    </Box>
                  </Box>
                </Stack>
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
                  {isOwner ? (
                    <Select
                      onChange={(e) => {
                        setEventStatus(e.target.value);
                      }}
                      value={eventStatus}
                      width={'150px'}
                    >
                      <option value='Upcoming'>Upcoming</option>
                      <option value='Live'>Live</option>
                      <option value='Closed'>Closed</option>
                      <option value='Cancelled'>Cancelled</option>
                      <option value='Ended'>Ended</option>
                    </Select>
                  ) : (
                    <EventBadge
                      width='100px'
                      status={event?.status || 'Live'}
                    />
                  )}
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
