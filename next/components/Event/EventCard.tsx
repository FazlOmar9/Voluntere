import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Event } from '../../hooks/useEvent';
import EventBadge from './EventBadge';

interface Props {
  children: Event;
}

const EventCard = ({ children: event }: Props) => {
  const redirect = `/event/${event._id}`;

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
        alt='Event Image'
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
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          <Heading size='md'>{event.name}</Heading>
        </Box>
        <EventBadge status={event.status} />
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
          <Text size='sm'>{event.description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default EventCard;
