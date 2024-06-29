import CommunityEventsPage from '@/components/community/CommunityEventsPage'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <CommunityEventsPage community={params.id} />
  )
}

export default page