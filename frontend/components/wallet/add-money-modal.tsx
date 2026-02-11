
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { CreditCard, Building, Wallet, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletBalance } from '@/hooks/use-wallet'

interface AddMoneyModalProps {
    isOpen: boolean
    onClose: () => void
    currentBalance: WalletBalance
}

export function AddMoneyModal({ isOpen, onClose, currentBalance }: AddMoneyModalProps) {
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState<'card' | 'bank'>('card')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleAddMoney = () => {
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
        <Modal isOpen={isOpen} onClose={onClose} title={`Add ${currentBalance.currency}`}>
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center text-center py-8"
                    >
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Success!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Added {currentBalance.symbol}{amount} to your {currentBalance.currency} wallet.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Amount Input */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-800 dark:bg-gray-800/50">
                            <label className="text-sm font-medium text-gray-500">Amount to add</label>
                            <div className="mt-2 flex items-center justify-center gap-1">
                                <span className="text-4xl font-bold text-gray-400">{currentBalance.symbol}</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full max-w-[200px] bg-transparent text-center text-4xl font-bold outline-none placeholder:text-gray-300 dark:text-white"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setMethod('card')}
                                    className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${method === 'card'
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700'
                                        }`}
                                >
                                    <CreditCard className="h-6 w-6" />
                                    <span className="text-sm font-bold">Card</span>
                                    {method === 'card' && (
                                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setMethod('bank')}
                                    className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${method === 'bank'
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700'
                                        }`}
                                >
                                    <Building className="h-6 w-6" />
                                    <span className="text-sm font-bold">Bank Transfer</span>
                                    {method === 'bank' && (
                                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Saved Cards Selection (Mock) */}
                        {method === 'card' && (
                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <span className="font-bold text-xs">VISA</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">•••• 4242</p>
                                    <p className="text-xs text-gray-500">Expires 12/28</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                                    Change
                                </Button>
                            </div>
                        )}

                        <Button
                            className="w-full rounded-xl bg-indigo-600 py-6 text-lg font-semibold hover:bg-indigo-700"
                            onClick={handleAddMoney}
                            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                `Add ${currentBalance.symbol}${amount || '0.00'}`
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    )
}
