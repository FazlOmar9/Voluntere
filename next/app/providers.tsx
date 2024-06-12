'use client';

import { ChakraProvider, useColorMode, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 5 seconds
      refetchInterval: 5 * 1000, // 5 seconds
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {children}
          <ColorModeSetter />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

function ColorModeSetter() {
  const { setColorMode } = useColorMode();
  
  useEffect(() => {
    setColorMode('light');
  }, [setColorMode]);

  return null;
}