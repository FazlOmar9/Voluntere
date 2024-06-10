import {
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
    <Card padding='10px 10px 10px 10px'>
      <Image
        src={'https://via.placeholder.com/150'}
        height='150px'
        width='100%'
        objectFit='cover'
      />
      <CardHeader borderBottom='1px'>
        <Heading size='md' isTruncated>
          {community.name}
        </Heading>
      </CardHeader>
      <CardBody>
        {/* <Heading size='sm'>Description</Heading> */}
        <Heading size='sm'>
          {community.description.length > 48
            ? `${community.description.substring(0, 48)}...`
            : community.description}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default CommunityCard;
