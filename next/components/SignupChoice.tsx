'use client';
import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Icon,
  Button,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FaUser, FaUsers } from 'react-icons/fa';

const Choice = () => {
  return (
    <Box
      w='100%'
      h='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <VStack spacing={8} align='center'>
        <LinkBox as='article'>
          <Box
            w={['90vw', 'lg']}
            p={8}
            borderWidth={2}
            borderColor="black"
            borderRadius='lg'
            boxShadow='lg'
            textAlign='center'
            _hover={{
              boxShadow: 'xl',
            }}
          >
            <Icon as={FaUser} w={10} h={10} mb={4} />
            <Heading size='lg' mb={4}>
              I'm a volunteer
            </Heading>
            <LinkOverlay href='/signup/volunteer' />
          </Box>
        </LinkBox>
        <LinkBox as='article'>
          <Box
            w={['90vw', 'lg']}
            p={8}
            borderWidth={2}
            borderColor="black"
            borderRadius='lg'
            boxShadow='lg'
            textAlign='center'
            _hover={{
              boxShadow: 'xl',
            }}
          >
            <Icon as={FaUsers} w={10} h={10} mb={4} />
            <Heading size='lg' mb={4}>
              I'm a community
            </Heading>
            <LinkOverlay href='/signup/community' />
          </Box>
        </LinkBox>
      </VStack>
    </Box>
  );
};

export default Choice;
