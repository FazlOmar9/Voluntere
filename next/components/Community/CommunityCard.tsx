import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Community } from '../../hooks/useCommunity';

interface Props {
  children: Community;
}

const CommunityCard = ({ children: community }: Props) => {
  const redirect = `/communities/${community._id}`;
  return (
    <Card
      as='a'
      padding='10px 10px 10px 10px'
      boxShadow='-1px 2px 6px rgba(0, 0, 0, 0.1)'
      height='400px'
      _hover={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)' }}
      transition='box-shadow 0.2s'
      href={redirect}
    >
      <Image
        src={'https://via.placeholder.com/150'}
        height='150px'
        width='100%'
        objectFit='cover'
      />
      <CardHeader borderBottom='1px'>
        <Box
          display='-webkit-box'
          overflow='hidden'
          textOverflow='ellipsis'
          css={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          <Heading size='md'>{community.name}</Heading>
        </Box>
      </CardHeader>
      <CardBody>
        <Box
          display='-webkit-box'
          overflow='hidden'
          textOverflow='ellipsis'
          css={{
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
        >
          <Text fontSize='md'>{community.description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CommunityCard;
