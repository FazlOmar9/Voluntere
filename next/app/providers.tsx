'use client';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1 * 1000, // 1 minute
      refetchInterval: 60 * 1 * 1000, // 1 minute
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {children}
          <ColorModeSetter />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
  );
}

function ColorModeSetter() {
  const { setColorMode } = useColorMode();
  
  useEffect(() => {
    setColorMode('light');
  }, [setColorMode]);

  return null;
}