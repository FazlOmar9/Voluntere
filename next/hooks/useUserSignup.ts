'use client';

import apiClient from '@/services/apiClient';
import { FormDataUS } from '@/components/auth/UserSignup';
import { useEffect, useState } from 'react';

const useUserSignup = (data: FormDataUS | null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    setIsSubmitted(false);
    setError(null);
    setIsLoading(true);

    apiClient
      .post('/user', data)
      .then((res) => {
        if (res.status == 200) setIsSubmitted(true);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [data]);

  return { isSubmitted, isLoading, error };
};

export default useUserSignup;
