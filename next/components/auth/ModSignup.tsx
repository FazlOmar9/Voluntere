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
  InputGroup,
  InputRightElement,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useModSignup from '@/hooks/useModSignup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const schema = z.object({
  modEmail: z.string().email(),
  modMobile: z
    .string()
    .length(10, { message: 'Mobile number must be exactly 10 digits' })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'Mobile number must only contain digits',
    }),
  modUsername: z
    .string()
    .min(8, { message: 'Username must be at least 8 characters' })
    .refine((value) => !/\s/.test(value), {
      message: 'Username must not contain whitespace',
    }),
  modPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine((value) => !/\s/.test(value), {
      message: 'Password must not contain whitespace',
    }),
  communityName: z.string().min(1),
  communityDescription: z.string().min(1),
});

export type FormDataMS = z.infer<typeof schema>;

const CommunitySignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataMS>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<FormDataMS | null>(null);

  const { isSubmitted, isLoading, error } = useModSignup(data);

  const onSubmit = (data: FormDataMS) => {
    setData(data);
  };

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
            <Heading size='md'>Moderator info</Heading>
            <FormControl id='modEmail' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                {...register('modEmail')}
                isInvalid={!!errors.modEmail}
                errorBorderColor='red.300'
              />
              {errors.modEmail && (
                <Text color='red'>{errors.modEmail.message}</Text>
              )}
            </FormControl>
            <FormControl id='modMobile' isRequired>
              <FormLabel>Mobile</FormLabel>
              <Input
                {...register('modMobile')}
                isInvalid={!!errors.modMobile}
                errorBorderColor='red.300'
              />
              {errors.modMobile && (
                <Text color='red'>{errors.modMobile.message}</Text>
              )}
            </FormControl>
            <FormControl id='modUsername' isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('modUsername')}
                isInvalid={!!errors.modUsername}
                errorBorderColor='red.300'
              />
              {errors.modUsername && (
                <Text color='red'>{errors.modUsername.message}</Text>
              )}
            </FormControl>
            <FormControl id='modPassword' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('modPassword')}
                  isInvalid={!!errors.modPassword}
                  errorBorderColor='red.300'
                />
                <InputRightElement>
                  <Button
                    variant='ghost'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.modPassword && (
                <Text color='red'>{errors.modPassword.message}</Text>
              )}
            </FormControl>
            <Heading size='md'>Community info</Heading>
            <FormControl id='communityName' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('communityName')}
                isInvalid={!!errors.communityName}
                errorBorderColor='red.300'
              />
              {errors.communityName && (
                <Text color='red'>{errors.communityName.message}</Text>
              )}
            </FormControl>
            <FormControl id='communityDescription' isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register('communityDescription')}
                isInvalid={!!errors.communityDescription}
                errorBorderColor='red.300'
                height='150px'
              />
              {errors.communityDescription && (
                <Text color='red'>{errors.communityDescription.message}</Text>
              )}
            </FormControl>
            <Button
              type='submit'
              isLoading={isLoading}
              loadingText='Submitting'
              size='lg'
              bg={'blue.400'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
              w='full'
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CommunitySignup;
