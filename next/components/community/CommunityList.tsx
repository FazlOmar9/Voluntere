'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import useCommunity from '../../hooks/useCommunity';
import CardSkeleton from './CardSkeleton';
import CommunityCard from './CommunityCard';
import { ChevronRightIcon } from '@chakra-ui/icons';

const CommunityList = () => {
  const { data: communities, isLoading } = useCommunity();

  return (
    <>
      <Breadcrumb
        spacing='8px'
        separator={<ChevronRightIcon color='gray.500' />}
        p='10px'
        fontSize='xl'
        fontWeight='bold'
      >
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/communities'>Communities</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ base:1, sm: 2, md: 3, lg: 4, xl: 5}}
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
