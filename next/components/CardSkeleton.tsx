import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';

const CardSkeleton = () => {
  return (
    <Card padding='10px 10px 10px 10px'>
      <Skeleton height='150px' isLoaded={false} />
      <CardHeader borderBottom='1px'>
        <SkeletonText noOfLines={2}/>
      </CardHeader>
      <CardBody>
        <SkeletonText noOfLines={1} isTruncated pb='10px'/>
        <SkeletonText noOfLines={1} isTruncated/>
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
