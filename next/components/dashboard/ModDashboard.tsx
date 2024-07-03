'use client';

import useCommunityByMod from '@/hooks/useCommunityByMod';
import useEventList from '@/hooks/useEventList';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import EventCard from '../event/EventCard';

const ModDashboard = () => {
  const { data: session, status } = useSession();
  const { data: community, isLoading: l2 } = useCommunityByMod(session?.user?.image || '');
  const { data: events, isLoading: l1 } = useEventList(community?._id || '');

  if (l1 || l2 || status === 'loading')
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  if (community !== undefined && events !== undefined)
    return (
      <Box p='10px 10px 10px 10px' minH={'100vh'}>
        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }}>
          <Card
            p='10px 10px 10px 10px'
            width='100%'
            bgColor='rgba(0, 0, 0, 0.05)'
            maxW={'1000px'}
          >
            <CardHeader>
              <Heading size={'lg'} mb={2}>
                Community Dashboard
              </Heading>
              <Divider borderColor='gray.400' />
            </CardHeader>
            <CardBody>
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
                <Stack spacing={'20px'}>
                  <Heading size='xl' pt='10px'>
                    {community?.name}
                    {/* Community name */}
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Moderated by{' '}
                    <Text fontWeight='bold'>
                      {community?.mod}
                      {/* Da mod */}
                    </Text>
                  </Heading>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
          <Card
            w={{ base: '100%', md: '100%', lg: '500px' }}
            maxW='500px'
            bgColor='rgba(0, 0, 0, 0.05)'
          >
            <CardBody>
              <Stack spacing={'50px'} direction={'column'}>
                <Stack spacing={3} direction={'column'}>
                  <Heading size={'lg'}>Manage</Heading>
                  <Table variant={'striped'} colorScheme='green'>
                    <Tbody>
                      <Tr>
                        <Td>Members</Td>
                        <Td fontWeight={'bold'}>{community?.members.length}</Td>
                      </Tr>
                      <Tr>
                        <Td>Events</Td>
                        <Td fontWeight={'bold'}>{community?.events.length}</Td>
                      </Tr>
                      <Tr>
                        <Td>Moderators</Td>
                        <Td fontWeight={'bold'}>1</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Stack>
                <Stack direction={'row'}>
                  <Button colorScheme='green' w={'100%'}>
                    Create event
                  </Button>
                  <Button colorScheme='red' w={'100%'} as={'a'} href='/moderator/remove'>
                    Remove event
                  </Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Card
          p='10px 10px 10px 10px'
          bgColor='rgba(0, 0, 0, 0.05)'
          mt='10px'
          maxW={'1500px'}
        >
          <CardHeader>
            <HStack justifyContent={'space-between'} alignItems={'baseline'}>
              <Heading size='lg'>Events</Heading>
              <Button
                color='black'
                as='a'
                variant='link'
                href={`/communities/${community?._id}/events`}
                display={
                  (community?.events?.length || 0) > 5 ? 'block' : 'none'
                }
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
              console.log(e);
              return <EventCard key={ind}>{e}</EventCard>;
            })}
          </SimpleGrid>
        </Card>
      </Box>
    );
};

export default ModDashboard;
