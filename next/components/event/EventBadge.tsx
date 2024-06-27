import { Badge } from '@chakra-ui/react';

interface EventBadgeProps {
  status: 'Upcoming' | 'Live' | 'Closed' | 'Cancelled' | 'Ended';
  width ?: string;
}

const EventBadge = ({ status, width }: EventBadgeProps) => {
  let colorScheme: string;

  switch (status) {
    case 'Upcoming':
      colorScheme = 'blue';
      break;
    case 'Live':
      colorScheme = 'green';
      break;
    case 'Closed':
      colorScheme = 'gray';
      break;
    case 'Cancelled':
      colorScheme = 'red';
      break;
    case 'Ended':
      colorScheme = 'yellow';
      break;
    default:
      colorScheme = 'red';
  }

  return <Badge colorScheme={colorScheme} width={width}>{status}</Badge>;
};

export default EventBadge;