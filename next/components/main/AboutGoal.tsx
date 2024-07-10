'use client';

import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Text,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export default function AboutGoal() {
  return (
    <Box>
      <Container maxW={'7xl'} zIndex={10} position={'relative'}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                color={'gray.500'}
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
              >
                THE DREAM
              </Text>
              <Heading mb={5} fontSize={{ base: '3xl', md: '5xl' }}>
                Voluntere: Ek prem katha
              </Heading>
              <Text fontSize={'xl'} color={'gray.400'}>
                Bringing hearts and communities together, empowering volunteers
                to make a pivotal difference and spread kindness globally.
              </Text>
            </Box>

            {stats && (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                {stats.map((stat) => (
                  <Box key={stat.title}>
                    <Text
                      fontFamily={'heading'}
                      fontSize={'3xl'}
                      fontWeight={'bold'}
                      color={'black'}
                      mb={3}
                    >
                      {stat.title}
                    </Text>
                    <Text fontSize={'lg'} color={'gray.500'}>
                      {stat.content}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={'span'} fontWeight={'500'} color={'gray.700'}>
    {children}
  </Text>
);

const stats = [
  {
    title: '20+',
    content: (
      <>
        <StatsText>Communities</StatsText> for you to join and explore.
      </>
    ),
  },
  {
    title: '60+',
    content: (
      <>
        <StatsText>Events</StatsText> to participate in and contribute.
      </>
    ),
  },
];
