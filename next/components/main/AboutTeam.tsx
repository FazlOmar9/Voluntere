'use client';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function AboutTeam() {
  const testimonialMessage = `Hey, I'm Fazl. I'm a fullstack developer and the founder of Voluntere. Super skilled dude with a passion for helping others.`

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')} minH='100vh'>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Meet Our Team</Heading>
          <Text>
            The great minds responsible for making voluntere what it is today.
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialText>
                {testimonialMessage}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={''}
              name={'Fazl Omar'}
              title={'Founder at Voluntere'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialText>
                {testimonialMessage}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={''}
              name={'Fazl Omar'}
              title={'Frontend Dev'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialText>
                {testimonialMessage}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={''}
              name={'Fazl Omar'}
              title={'Backend Dev'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
