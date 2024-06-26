'use client';

import {
  Box,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Spinner,
  VStack
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUser, FaUsers } from 'react-icons/fa';

const Choice = () => {
  const vmsg = `I'm a volunteer`;
  const cmsg = `I'm a community`;

  const { status } = useSession();
  const router = useRouter();
  
  if (status === 'loading') {
    return (
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Spinner color='black' />
      </Flex>
    );
  } else if (status === 'authenticated') {
    router.push('/');
    return null;
  }

  return (
      <Box
        w='100%'
        minH='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <VStack spacing={8} align='center' p='10px 10px 10px 10px'>
          <LinkBox as='article'>
            <Box
              w={['90vw', 'lg']}
              p={8}
              borderWidth={2}
              borderColor='black'
              borderRadius='lg'
              boxShadow='lg'
              textAlign='center'
              _hover={{
                boxShadow: 'xl',
              }}
            >
              <Icon as={FaUser} w={10} h={10} mb={4} />
              <Heading size='lg' mb={4}>
                {vmsg}
              </Heading>
              <LinkOverlay href='/signup/volunteer' />
            </Box>
          </LinkBox>
          <LinkBox as='article'>
            <Box
              w={['90vw', 'lg']}
              p={8}
              borderWidth={2}
              borderColor='black'
              borderRadius='lg'
              boxShadow='lg'
              textAlign='center'
              _hover={{
                boxShadow: 'xl',
              }}
            >
              <Icon as={FaUsers} w={10} h={10} mb={4} />
              <Heading size='lg' mb={4}>
                {cmsg}
              </Heading>
              <LinkOverlay href='/signup/community' />
            </Box>
          </LinkBox>
        </VStack>
      </Box>
  );
};

export default Choice;
