'use client';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^\S*$/, 'No whitespaces allowed'),
});

export type FormDataSI = z.infer<typeof schema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSI>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormDataSI> = async (data) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      ...data,
      mod: isModerator ? '1' : '0',
    }).then((res) => {
      setIsLoading(false);
      console.log(res);
      return res;
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Tabs
            isFitted
            variant='enclosed'
            onChange={(index) => setIsModerator(index === 1)}
          >
            <TabList mb='1em'>
              <Tab>
                <Heading size='sm'>Volunteer</Heading>
              </Tab>
              <Tab>
                <Heading size='sm'>Moderator</Heading>
              </Tab>
            </TabList>
          </Tabs>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' type='text' {...register('username')} />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement>
                    <Button
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      variant={'ghost'}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword((prev) => !prev);
                      }}
                      size='sm'
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Checkbox>Remember me</Checkbox>
                <Button
                  size='lg'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  loadingText='Signing In'
                  isLoading={isLoading}
                  type='submit'
                >
                  Sign in
                </Button>
              </Stack>
              {error && (
                <Text color='red.500' textAlign='center'>
                  {error}
                </Text>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
