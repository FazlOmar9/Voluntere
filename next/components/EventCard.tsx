import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { Event } from '../hooks/useEvent';
import EventBadge from './EventBadge';

interface Props {
  children: Event;
}

const EventCard = ({ children: event }: Props) => {
  return (
    <Card padding='10px 10px 10px 10px'>
     <Image
      src={'https://via.placeholder.com/150'}
      height="150px"
      width="100%"
      objectFit="cover"
    />
      <CardHeader borderBottom='1px'>
        <Heading size='md' isTruncated>
          {event.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <Heading size='sm' isTruncated>{event.description}</Heading>
          <EventBadge status={event.status} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
