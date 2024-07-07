'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Text,
  VStack,
  Box,
  Flex,
  Heading,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import useCreateEvent from '@/hooks/useCreateEvent';
import useCommunityByMod from '@/hooks/useCommunityByMod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  dateTime: z.string().min(1, { message: 'Date and Time are required' }), // Changed to dateTime for 'datetime-local' input type
  venue: z.string().min(1, { message: 'Venue is required' }),
  requirement: z.string(),
  status: z.enum(['Upcoming', 'Live', 'Closed', 'Cancelled', 'Ended'], {
    message: 'Invalid status',
  }),
});

export type FormData = z.infer<typeof schema>;

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const [data, setData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setData(data);
  };

  const { data: session, status } = useSession();
  const { data: community, isLoading: l1 } = useCommunityByMod(session?.user?.image || '');

  const { isSubmitted, isLoading, error } = useCreateEvent(data, community?._id || '');
  const router = useRouter();

  useEffect(() => {
    if (!isSubmitted) return;
    toast({
      title: 'Signed up successfully!',
      description: 'Your community has been created.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    reset();
  }, [isSubmitted]);

  useEffect(() => {
    if (!error) return;
    toast({
      title: 'An error occurred.',
      description: 'Please try again later.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }, [error]);

  if (l1 || status === 'loading') {
    return (
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Spinner color='black' />
      </Flex>
    );
  }

  if (status === 'unauthenticated' || session?.user?.email !== '1') router.push('/');

  return (
    <Flex direction='column' align='center' justify='center' bg='gray.50'>
      <Box
        mt={'10px'}
        mb={'10px'}
        w={['90%', '85%', '80%', '400px']}
        p={4}
        bg='white'
        borderRadius='md'
        boxShadow='xl'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <Heading size='md'>Create Event</Heading>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name')} />
              {errors.name && (
                <Text color='red.500'>{errors.name.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description')} />
              {errors.description && (
                <Text color='red.500'>{errors.description.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.dateTime}>
              <FormLabel>Date and Time</FormLabel>
              <Input type='datetime-local' {...register('dateTime')} />
              {errors.dateTime && (
                <Text color='red.500'>{errors.dateTime.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.venue}>
              <FormLabel>Venue</FormLabel>
              <Input {...register('venue')} />
              {errors.venue && (
                <Text color='red.500'>{errors.venue.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.requirement}>
              <FormLabel>Requirement</FormLabel>
              <Input type='number' {...register('requirement')} />
              {errors.requirement && (
                <Text color='red.500'>{errors.requirement.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.status}>
              <FormLabel>Status</FormLabel>
              <Select {...register('status')}>
                <option value='Upcoming'>Upcoming</option>
                <option value='Live'>Live</option>
                <option value='Closed'>Closed</option>
                <option value='Cancelled'>Cancelled</option>
                <option value='Ended'>Ended</option>
              </Select>
              {errors.status && (
                <Text color='red.500'>{errors.status.message}</Text>
              )}
            </FormControl>
            <Button
              type='submit'
              size='lg'
              isLoading={isLoading}
              loadingText='Creating...'
              bg={'green.400'}
              color={'white'}
              _hover={{ bg: 'green.500' }}
              w='full'
            >
              Create
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateEvent;
