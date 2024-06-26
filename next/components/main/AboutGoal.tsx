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
                    <Text fontSize={'xl'} color={'gray.400'}>
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
  <Text as={'span'} fontWeight={700} color={'gray.700'}>
    {children}<br />
  </Text>
);

const stats = [
  {
    title: '10+',
    content: (
      <>
        <StatsText>10+ Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: '24/7',
    content: (
      <>
        <StatsText>24/7 Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: '13%',
    content: (
      <>
        <StatsText>13% Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    ),
  },
  {
    title: '250M+',
    content: (
      <>
        <StatsText>250M+ Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];
