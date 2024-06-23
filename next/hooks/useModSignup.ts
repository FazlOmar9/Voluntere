import { useEffect, useState } from 'react';
import { FormDataMS } from '@/components/auth/ModSignup';
import apiClient from '@/services/apiClient';

const useModSignup = (data: FormDataMS | null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    const submitForm = async () => {
      setIsLoading(true);
      setError(null);
      setIsSubmitted(false);

      apiClient
        .post('/mod', {
          email: data.modEmail,
          mobile: data.modMobile,
          username: data.modUsername,
          password: data.modPassword,
        })
        .then((r1) => {
          apiClient
            .post('/community', {
              name: data.communityName,
              description: data.communityDescription,
            })
            .then((r2) => {
              if (r1.status == 200 && r2.status == 200) setIsSubmitted(true);
            })
            .catch((err) => setError(err));
        })
        .catch((err) => setError(err))
        .finally(() => {
          setIsLoading(false);
        });
    };

    submitForm();
  }, [data]);

  return { isSubmitted, isLoading, error };
};

export default useModSignup;
