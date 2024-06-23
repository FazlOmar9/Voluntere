import { FormDataSI } from '@/components/auth/SignIn';
import apiClient from '@/services/apiClient';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogin = (data: FormDataSI | null, mod: boolean) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const endpoint = mod ? '/mod/auth' : '/user/auth';
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    setIsLoading(true);

    apiClient
      .post(endpoint, data)
      .then((res) => {
        const { _id, username } = res.data;
        setError(null);
        Cookies.set('user', JSON.stringify({ _id, username, mod }), {
          expires: 7,
        });
        router.push('/');
        // console.log(res);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [data]);

  return { error, isLoading };
};

export default useLogin;
