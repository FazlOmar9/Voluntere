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
  Tr,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import EventCard from '../event/EventCard';
import { useState } from 'react';
import imageApiClient from '@/services/imageApiClient';
import { useRouter } from 'next/navigation';

const ModDashboard = () => {
  const { data: session, status } = useSession();
  const {
    data: community,
    isLoading: l2,
    refetch,
  } = useCommunityByMod(session?.user?.image || '');
  const { data: events, isLoading: l1 } = useEventList(community?._id || '');
  const router = useRouter();

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    formData.append('type', 'community');
    if (session && session.user && community)
      formData.append('id', community._id);

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

  if (l1 || l2 || status === 'loading')
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  if (status === 'unauthenticated' || session?.user?.email !== '1')
    router.push('/signin');

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
                <Stack alignItems={'center'}>
                  <Image
                    crossOrigin='anonymous'
                    src={community?.banner || 'https://placehold.co/600x400'}
                    alt='community image'
                    width='300px'
                    height='200px'
                    objectFit='cover'
                  />
                  <Button
                    variant={'link'}
                    color={'blue.800'}
                    mt={2}
                    onClick={() => setShowEdit((r) => !r)}
                  >
                    {showEdit ? 'Cancel' : 'Change image'}
                  </Button>
                  <Box display={showEdit ? 'block' : 'none'}>
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
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
                </Stack>
                <Stack spacing={'20px'}>
                  <Heading size='xl' pt='10px'>
                    {community?.name}
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    Moderated by <Text fontWeight='bold'>{community?.mod}</Text>
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
                  <Button
                    colorScheme='green'
                    w={'100%'}
                    as={'a'}
                    href='/moderator/create'
                  >
                    Create event
                  </Button>
                  <Button
                    colorScheme='red'
                    w={'100%'}
                    as={'a'}
                    href='/moderator/remove'
                  >
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
              return <EventCard key={ind}>{e}</EventCard>;
            })}
          </SimpleGrid>
        </Card>
      </Box>
    );
};

export default ModDashboard;
