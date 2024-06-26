'use client';

import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import useCommunity from '../../hooks/useCommunity';
import CardSkeleton from './CardSkeleton';
import CommunityCard from './CommunityCard';

const CommunityList = () => {
  const { data: communities, error, isLoading } = useCommunity();

  // if (error) throw new Error(error.message);
  if (error) console.log(error.message);

  return (
    <>
      <Heading p='20px'>Communities</Heading>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
        padding='10px'
        spacing={6}
      >
        {isLoading
          ? Array(20)
              .fill(0)
              .map((_, index) => <CardSkeleton key={index} />)
          : communities?.map((community, index) => (
              <CommunityCard key={index}>{community}</CommunityCard>
            ))}
      </SimpleGrid>
    </>
  );
};

export default CommunityList;
