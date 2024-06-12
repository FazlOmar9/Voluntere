import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Community } from '../hooks/useCommunity';

interface Props {
  children: Community;
}

const CommunityCard = ({ children: community }: Props) => {
  return (
    <Card
      padding='10px 10px 10px 10px'
      // bgColor={'gray.200'}
      // boxShadow='-2px 2px 6px rgba(0, 0, 0, 0.2)' // Add this line
    >
      <Image 
        src={'https://via.placeholder.com/150'}
        height='150px'
        width='100%'
        objectFit='cover'
      />
      {/* <Box bgColor='gray.900' height='150px' /> */}
      <CardHeader borderBottom='1px'>
        <Heading size='md' isTruncated>
          {community.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size='sm' isTruncated>
          {community.description}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default CommunityCard;
