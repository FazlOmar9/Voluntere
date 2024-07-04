import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import { FormData } from '@/components/dashboard/CreateEvent';

const useCreateEvent = (data: FormData | null, communityId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    const submitForm = async () => {
      setIsLoading(true);
      setError(null);
      setIsSubmitted(false);

      const body = {
        name: data.name,
        description: data.description,
        date: data.dateTime,
        venue: data.venue,
        community: communityId,
        requirement: parseInt(data.requirement),
        status: data.status,
      };

      apiClient
        .post('/event', body)
        .then((r1) => {
          apiClient
            .put(`/community/${communityId}`, {
              event: r1.data._id,
            })
            .then((r2) => {
              if (r1.status == 200 && r2.status == 200) setIsSubmitted(true);
            })
            .catch((err) => {
              setError(err);
            });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    submitForm();
  }, [data]);

  return { isSubmitted, isLoading, error };
};

export default useCreateEvent;
