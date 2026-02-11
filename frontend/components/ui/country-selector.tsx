
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Country {
    code: string
    name: string
    currency: string
    flag: string
    symbol: string
}

export const COUNTRIES: Country[] = [
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸', symbol: '$' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', symbol: '£' },
    { code: 'EU', name: 'European Union', currency: 'EUR', flag: '🇪🇺', symbol: '€' },
    { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦', symbol: '$' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', symbol: '₦' },
    { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳', symbol: '₹' },
    { code: 'PH', name: 'Philippines', currency: 'PHP', flag: '🇵🇭', symbol: '₱' },
    { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪', symbol: 'KSh' },
    { code: 'MX', name: 'Mexico', currency: 'MXN', flag: '🇲🇽', symbol: '$' },
]

interface CountrySelectorProps {
    selectedCountry: Country
    onSelect: (country: Country) => void
    label?: string
    align?: 'left' | 'right'
}

export function CountrySelector({ selectedCountry, onSelect, label, align = 'left' }: CountrySelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={containerRef}>
            {label && (
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 transition-all hover:border-indigo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.currency}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedCountry.name}</p>
                </div>
                <ChevronDown className={cn(
                    "ml-2 h-4 w-4 text-gray-400 transition-transform group-hover:text-indigo-600",
                    isOpen && "rotate-180"
                )} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                            "absolute z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-gray-800",
                            align === 'right' ? 'right-0' : 'left-0'
                        )}
                    >
                        <div className="max-h-64 overflow-y-auto">
                            {COUNTRIES.map((country) => (
                                <motion.button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                        onSelect(country)
                                        setIsOpen(false)
                                    }}
                                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                                    whileHover={{ x: 4 }}
                                >
                                    <span className="text-2xl">{country.flag}</span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-white">{country.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{country.currency}</p>
                                    </div>
                                    {selectedCountry.code === country.code && (
                                        <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
