'use client';

import {
  Divider,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { Community } from '../../hooks/useCommunity';
import CommunityCard from '../community/CommunityCard';

const UserCommunities = ({
  communities,
  back,
}: {
  communities: Community[];
  back: () => void;
}) => {
  return (
    <>
      <HStack spacing={5} p={2}>
        <IconButton
          aria-label='Go back'
          icon={<FaArrowLeft />}
          onClick={() => back()}
          variant={'ghost'}
        />
        <Text fontSize={'xl'} fontWeight={'bold'}>Your Communities</Text>
      </HStack>
      <Divider borderColor='gray.400' />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
        padding='10px'
        spacing={6}
      >
        {communities?.map((community, index) => (
          <CommunityCard key={index}>{community}</CommunityCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserCommunities;
