'use client';

import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { FaFaceDizzy } from 'react-icons/fa6';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error.message)
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      minH='100vh'
      bgColor={'black'}
    >
      <Stack alignItems={'center'}>
        <FaFaceDizzy size={100} color='white'/>
        <Heading color={'white'} mt={'30px'}>An error has occured!</Heading>
        <Button as={'a'} variant={'link'} href='/' color={'blue.500'}>
          Go back to home page
        </Button>
      </Stack>
    </Flex>
  );
}
