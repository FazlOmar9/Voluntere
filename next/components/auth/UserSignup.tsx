'use client';

import useUserSignup from '@/hooks/useUserSignup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MessageModal from './MessageModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is invalid' }),
  mobile: z
    .string()
    .length(10, { message: 'Mobile number must be exactly 10 digits' })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'Mobile number must only contain digits',
    }),
  username: z
    .string()
    .min(8, { message: 'Username must be at least 8 characters' })
    .refine((value) => !/\s/.test(value), {
      message: 'Username must not contain whitespace',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine((value) => !/\s/.test(value), {
      message: 'Password must not contain whitespace',
    }),
});

export type FormDataUS = {
  name: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
};

const UserSignup = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataUS>({
    resolver: zodResolver(schema),
  });

  const [data, setData] = useState<FormDataUS | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalLink, setModalLink] = useState<string>('');

  const onSubmit = (data: FormDataUS) => {
    setData(data);
  };

  const { isSubmitted, isLoading, error } = useUserSignup(data);

  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;
    toast({
      title: 'Signed up successfully!',
      description: 'Your account has been created.',
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
    <Flex
      direction='column'
      align='center'
      justify='center'
      bg='gray.50'
      minH='100vh'
    >
      <Box
        w={['90%', '85%', '80%', '400px']}
        p={4}
        bg='white'
        borderRadius='md'
        boxShadow='xl'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <Heading size='md' pb='10px'>
              Voluntere Info
            </Heading>
            <FormControl id='name' isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('name')}
                isInvalid={!!errors.name}
                errorBorderColor='red.300'
              />

              {errors.name && <Text color='red'>{errors.name.message}</Text>}
            </FormControl>

            <FormControl id='email' isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email')}
                isInvalid={!!errors.email}
                errorBorderColor='red.300'
              />

              {errors.email && <Text color='red'>{errors.email.message}</Text>}
            </FormControl>

            <FormControl id='mobile' isRequired mb={4}>
              <FormLabel>Mobile</FormLabel>
              <Input
                {...register('mobile')}
                isInvalid={!!errors.mobile}
                errorBorderColor='red.300'
              />

              {errors.mobile && (
                <Text color='red'>{errors.mobile.message}</Text>
              )}
            </FormControl>

            <FormControl id='username' isRequired mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('username')}
                isInvalid={!!errors.username}
                errorBorderColor='red.300'
              />
              {errors.username && (
                <Text color='red'>
                  {<Text color='red'>{errors.username.message}</Text>}
                </Text>
              )}
            </FormControl>

            <FormControl id='password' isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  isInvalid={!!errors.password}
                  errorBorderColor='red.300'
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {errors.password && (
                <Text color='red'>{errors.password.message}</Text>
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
              mt={4}
            >
              Sign up
            </Button>
          </VStack>
        </form>
        <MessageModal
          isOpen={isModalOpen}
          isSuccess={isSubmitted}
          link={modalLink}
        >
          {modalMessage}
        </MessageModal>
      </Box>
    </Flex>
  );
};

export default UserSignup;
