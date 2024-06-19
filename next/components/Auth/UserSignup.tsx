'use client';

import useUserSignup from '@/hooks/useUserSignup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MessageModal from './MessageModal';
import { useRouter } from 'next/router';

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
    .min(8, { message: 'Username must be at least 8 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
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
    reset
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

  const { isSubmitted, setIsSubmitted, isLoading, error } = useUserSignup(data);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;
    setIsModalOpen(true);
    setModalMessage('Signed up successfully!');
    setModalLink('/');
    setTimeout(() => {
      setIsModalOpen(false);
      setModalMessage('');
      setIsSubmitted(false);
      reset();
    }, 2000)
  }, [isSubmitted])

  useEffect(() => {
    if (!error) return;
    setIsModalOpen(true);
    setModalMessage('There was an error. Try again later');
    setModalLink('/signup/volunteer');
    setTimeout(() => {
      setIsModalOpen(false);
      setModalMessage('');
    }, 2000)
  }, [error])

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      h='100vh'
      bg='gray.50'
    >
      <Box
        w={['90%', '85%', '80%', '400px']}
        p={4}
        bg='white'
        borderRadius='md'
        boxShadow='xl'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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

            {errors.mobile && <Text color='red'>{errors.mobile.message}</Text>}
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
        </form>
        <MessageModal isOpen={isModalOpen} isSuccess={isSubmitted} link={modalLink} >{modalMessage}</MessageModal>
      </Box>
    </Flex>
  );
};

export default UserSignup;