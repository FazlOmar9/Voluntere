'use client';

import useSingleCommunity from '@/hooks/useSingleCommunity';

import useEventList from '@/hooks/useEventList';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import EventCard from '../Event/EventCard';

const CommunityPage = ({ id }: { id: string }) => {
  const { data: community, error, isLoading } = useSingleCommunity(id);
  const { data: events } = useEventList(id || 'xxx');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
          </Stack>
        </CardHeader>
        <CardBody>
          <Heading size='md'>About</Heading>
          <Text>{community?.description}</Text>
        </CardBody>
      </Card>
      <Card bgColor='rgba(0, 0, 0, 0.05)' p='10px 20px 10px 20px' mt='20px' mr='10px'>
        <CardHeader>
          <Heading size='lg'>Events</Heading>
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
