
'use client'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/lib/language-context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    // Create a new query client for each session/request to avoid data leaking between users
    // during SSR, while ensuring it's stable on the client
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
