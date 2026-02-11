
import { create } from 'zustand'
import { Country } from '@/components/ui/country-selector'

interface Quote {
    quoteId: string
    sourceCurrency: string
    targetCurrency: string
    sourceAmount: number
    targetAmount: number
    exchangeRate: number
    fees: {
        transferFee: number
        serviceFee: number
    }
    expiresAt: number
}

interface Recipient {
    id: number
    name: string
    country: string
    accountNumber: string
    bank: string
}

interface SendMoneyState {
    amount: string
    sourceCountry: Country | null
    targetCountry: Country | null
    quote: Quote | null
    recipient: Recipient | null

    setAmount: (amount: string) => void
    setSourceCountry: (country: Country) => void
    setTargetCountry: (country: Country) => void
    setQuote: (quote: Quote | null) => void
    setRecipient: (recipient: Recipient | null) => void
    reset: () => void
}

export const useSendMoneyStore = create<SendMoneyState>((set) => ({
    amount: '',
    sourceCountry: null,
    targetCountry: null,
    quote: null,
    recipient: null,

    setAmount: (amount) => set({ amount }),
    setSourceCountry: (sourceCountry) => set({ sourceCountry }),
    setTargetCountry: (targetCountry) => set({ targetCountry }),
    setQuote: (quote) => set({ quote }),
    setRecipient: (recipient) => set({ recipient }),
    reset: () => set({
        amount: '',
        quote: null,
        recipient: null
        // We keep countries as user preference
    }),
}))
