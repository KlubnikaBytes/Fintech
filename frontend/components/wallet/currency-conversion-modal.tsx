
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { CountrySelector, COUNTRIES, Country } from '@/components/ui/country-selector'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletBalance } from '@/hooks/use-wallet'

interface CurrencyConversionModalProps {
    isOpen: boolean
    onClose: () => void
    sourceBalance: WalletBalance
}

export function CurrencyConversionModal({ isOpen, onClose, sourceBalance }: CurrencyConversionModalProps) {
    const [amount, setAmount] = useState('')
    const [sourceCountry, setSourceCountry] = useState<Country>(
        COUNTRIES.find(c => c.currency === sourceBalance.currency) || COUNTRIES[0]
    )
    const [targetCountry, setTargetCountry] = useState<Country>(COUNTRIES[4]) // Default to NGN
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    // Mock conversion rate
    const rate = 1580.50 // Mock rate for USD to NGN
    const convertedAmount = amount ? (parseFloat(amount) * rate).toFixed(2) : '0.00'

    const handleConvert = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                setAmount('')
                onClose()
            }, 2000)
        }, 1500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Convert Currency">
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center text-center py-8"
                    >
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Conversion Successful!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            You successfully converted {sourceCountry.symbol}{amount} to {targetCountry.symbol}{convertedAmount}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* From */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                            <label className="text-sm font-medium text-gray-500">From</label>
                            <div className="mt-2 flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm dark:bg-gray-800">
                                        <span className="text-2xl">{sourceCountry.flag}</span>
                                        <span className="font-bold">{sourceCountry.currency}</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-transparent text-right text-3xl font-bold outline-none placeholder:text-gray-300 dark:text-white"
                                />
                            </div>
                            <div className="mt-2 text-right text-sm text-gray-500">
                                Balance: {sourceBalance.symbol}{sourceBalance.amount.toLocaleString()}
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="relative flex justify-center -my-3 z-10">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <ArrowDown className="h-5 w-5 text-indigo-600" />
                            </div>
                        </div>

                        {/* To */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
                            <label className="text-sm font-medium text-gray-500">To</label>
                            <div className="mt-2 flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <CountrySelector
                                        selectedCountry={targetCountry}
                                        onSelect={setTargetCountry}
                                    />
                                </div>
                                <div className="flex-1 text-right text-3xl font-bold text-gray-900 dark:text-white">
                                    {targetCountry.symbol}{convertedAmount}
                                </div>
                            </div>
                        </div>

                        {/* Rate Info */}
                        <div className="flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
                            <span className="font-medium">Exchange Rate</span>
                            <span className="font-bold">1 {sourceCountry.currency} = {rate} {targetCountry.currency}</span>
                        </div>

                        <Button
                            className="w-full rounded-xl bg-indigo-600 py-6 text-lg font-semibold hover:bg-indigo-700"
                            onClick={handleConvert}
                            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                "Convert Now"
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    )
}
