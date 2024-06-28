'use client';

import useSingleCommunity from '@/hooks/useSingleCommunity';
import useEventList from '@/hooks/useEventList';
import { addMember, removeMember } from '@/hooks/useCommunityMembership';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import EventCard from '../event/EventCard';
import { useEffect, useState } from 'react';

const CommunityPage = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const { data: community, error, isLoading } = useSingleCommunity(id);
  const { data: events } = useEventList(id);

  const [isMember, setIsMember] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  useEffect(() => {
    if (community) {
      setIsMember(
        community?.members.includes(session?.user?.image || '') || false
      );
    }
  }, [community, session]);

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );
  }
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

  if (!community) return <Flex minH={'100vh'}>Community not found</Flex>;

  const handleClick = () => {
    const successCallback = () => {
      setIsMember((r) => !r);
      setIsBtnLoading(false);
    };
    setIsBtnLoading(true);
    isMember
      ? removeMember(
          community?._id || '',
          session?.user?.name || '',
          session?.user?.image || '',
          successCallback
        )
      : addMember(
          community?._id || '',
          session?.user?.name || '',
          session?.user?.image || '',
          successCallback
        );
  };

  return (
    <Box p='20px 10px 10px 20px' minH='100vh'>
      <Card
        p='10px 10px 10px 10px'
        width='100%'
        maxW='1000px'
        bgColor='rgba(0, 0, 0, 0.05)'
      >
        <CardHeader borderBottom='1px'>
          <Stack
            justifyContent='space-between'
            align='end'
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'center', md: 'end' }}
          >
            <Image
              src='https://placehold.co/600x400'
              alt='community image'
              height='200px'
            />
            <Stack spacing={'50px'}>
              <Stack>
                <Heading size='xl' pt='10px'>
                  {community?.name}
                </Heading>
                <Heading size='sm' fontWeight='normal'>
                  Moderated by <Text fontWeight='bold'>{community?.mod}</Text>
                </Heading>
                <Heading size='sm' fontWeight='normal'>
                  Members{' '}
                  <Text fontWeight='bold' as='span'>
                    {community?.members.length}
                  </Text>
                </Heading>
              </Stack>

              <Stack alignItems={'center'}>
                {status === 'authenticated' ? (
                  <Button
                    width={'100%'}
                    maxW={'220px'}
                    isDisabled={session?.user?.email === '1'}
                    isLoading={isBtnLoading}
                    colorScheme={isMember ? 'red' : 'green'}
                    onClick={handleClick}
                  >
                    {isMember ? 'Leave' : 'Join'}
                  </Button>
                ) : (
                  <Button
                    width={'100%'}
                    maxW={'220px'}
                    colorScheme='green'
                    isLoading={status === 'loading'}
                    as={Link}
                    href={'/signin'}
                  >
                    Sign in to Join
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </CardHeader>
        <CardBody>
          <Heading size='md'>About</Heading>
          <Text>{community?.description}</Text>
        </CardBody>
      </Card>
      <Card
        bgColor='rgba(0, 0, 0, 0.05)'
        p='10px 20px 10px 20px'
        mt='20px'
        mr='10px'
      >
        <CardHeader>
          <HStack justifyContent={'space-between'} alignItems={'baseline'}>
            <Heading size='lg'>Events</Heading>
            <Button
              color='black'
              as='a'
              variant='link'
              href={`/communities/${id}/events`}
              display={events?.length || 0 > 5 ? 'block' : 'none'}
            >
              Show more
            </Button>
          </HStack>
        </CardHeader>
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          spacing={6}
          pt='10px'
          pb='10px'
        >
          {events?.map((e, ind) => {
            return <EventCard key={ind}>{e}</EventCard>;
          })}
        </SimpleGrid>
      </Card>
    </Box>
  );
};

export default CommunityPage;
