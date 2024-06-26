import EventPage from '@/components/event/EventPage';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <EventPage id={params.id} />;
};

export default page;
