import CommunityPage from '@/components/community/CommunityPage';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <CommunityPage id={params.id} />;
};

export default page;
