import EventList from '@/components/event/EventList'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <EventList community={params.id} />
  )
}

export default page