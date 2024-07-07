'use client';

import useUser from '@/hooks/useUser';
import imageApiClient from '@/services/imageApiClient';
import {
  Badge,
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CommunityCard from '../community/CommunityCard';
import EventCard from '../event/EventCard';
import UserCommunities from './UserCommunities';
import UserEvents from './UserEvents';

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const { data: user, isLoading, refetch } = useUser(session?.user?.name || '');
  const [page, setPage] = useState<number>(0);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    formData.append('type', 'user');
    if (session && session.user && session.user.name)
      formData.append('id', session.user.name);

    if (fileInput.files && (fileInput.files || []).length > 0) {
      formData.append('file', fileInput.files[0]);

      try {
        const response = await imageApiClient.post('/uploads', formData);
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

  if (isLoading || status === 'loading')
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner color='black' />
      </Flex>
    );

  if (status === 'unauthenticated' || session?.user?.email !== '0') router.push('/');

  if (page === 0) {
    return (
      <Box p='10px 10px 10px 10px' minH='100vh'>
        <Card
          p='10px 10px 10px 10px'
          width='100%'
          bgColor='rgba(0, 0, 0, 0.05)'
        >
          <CardBody>
            <Stack
              direction={{ base: 'column', md: 'column', lg: 'row' }}
              spacing='40px'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack alignItems={'center'}>
                <Image
                  height={'250px'}
                  width={'250px'}
                  borderRadius={'full'}
                  crossOrigin='anonymous'
                  src={
                    user?.profileImage ||
                    'https://images.dog.ceo/breeds/retriever-golden/n02099601_5544.jpg'
                  }
                  objectFit={'cover'}
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
              <Stack>
                <Heading size={'2xl'}>{user?.name}</Heading>
                <Text fontSize={'lg'}>{user?.email}</Text>
                <Badge colorScheme='blue' width={'min-content'}>
                  Volunteer
                </Badge>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
        <Card bgColor='rgba(0, 0, 0, 0.05)' p='10px 20px 10px 20px' mt='20px'>
          <CardHeader>
            <HStack justifyContent={'space-between'} alignItems={'baseline'}>
              <Heading size='lg'>Events</Heading>
              <Button
                color='black'
                variant='link'
                display={(user?.events?.length || 0) > 5 ? 'block' : 'none'}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(1);
                }}
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
            {user?.events?.slice(0, 5).map((e, ind) => {
              return <EventCard key={ind}>{e}</EventCard>;
            })}
          </SimpleGrid>
        </Card>
        <Card
          bgColor='rgba(0, 0, 0, 0.05)'
          p='10px 20px 10px 20px'
          mt='20px'
          mb={'30px'}
        >
          <CardHeader>
            <Stack
              direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }}
              justifyContent={'space-between'}
              alignItems={'baseline'}
            >
              <Heading size='lg'>Communities</Heading>
              <Button
                color='black'
                variant='link'
                display={
                  (user?.communities?.length || 0) > 5 ? 'block' : 'none'
                }
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(2);
                }}
              >
                Show more
              </Button>
            </Stack>
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
            {user?.communities?.slice(0, 5).map((e, ind) => {
              return <CommunityCard key={ind}>{e}</CommunityCard>;
            })}
          </SimpleGrid>
        </Card>
      </Box>
    );
  } else if (page === 1) {
    return <UserEvents events={user?.events || []} back={() => setPage(0)} />;
  } else if (page === 2) {
    return (
      <UserCommunities
        communities={user?.communities || []}
        back={() => setPage(0)}
      />
    );
  }
};

export default UserDashboard;
