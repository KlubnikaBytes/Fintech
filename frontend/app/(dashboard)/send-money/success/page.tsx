
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Home, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useSendMoneyStore } from '@/hooks/use-send-money-store'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
    const { quote, recipient, reset } = useSendMoneyStore()

    useEffect(() => {
        // Confetti effect on mount
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-950 print:bg-white print:p-0">
            {/* Printable Receipt - Only visible when printing */}
            <div className="hidden print:block print:w-full print:max-w-3xl print:mx-auto print:p-8">
                <div className="text-center border-b pb-8 mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">TS</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Transfer Receipt</h1>
                    <p className="text-gray-500 mt-2">Reference: {quote?.quoteId}</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">Amount Sent</span>
                            <span className="text-xl font-bold">{quote?.sourceCurrency} {quote?.sourceAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Amount Received</span>
                            <span className="text-xl font-bold text-green-600">{quote?.targetCurrency} {quote?.targetAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date</p>
                            <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <p className="font-medium text-green-600">Completed</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Recipient</p>
                            <p className="font-medium">{recipient?.name}</p>
                            <p className="text-sm text-gray-500">{recipient?.bank} •• {recipient?.accountNumber.slice(-4)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Exchange Rate</p>
                            <p className="font-medium">1 {quote?.sourceCurrency} = {quote?.exchangeRate.toFixed(4)} {quote?.targetCurrency}</p>
                        </div>
                    </div>

                    <div className="border-t pt-6 mt-8">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Transfer Fee</span>
                            <span>{quote?.sourceCurrency} {quote?.fees.transferFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Service Fee</span>
                            <span>{quote?.sourceCurrency} {quote?.fees.serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-dashed">
                            <span>Total Paid</span>
                            <span>{quote?.sourceCurrency} {(quote?.sourceAmount || 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Thank you for using TapTap Send Clone!</p>
                    <p className="mt-1">For support, please contact help@taptapsendclone.com</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md print:hidden"
            >
                <Card className="overflow-hidden border-0 bg-white p-8 text-center shadow-2xl dark:bg-gray-900">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30"
                    >
                        <CheckCircle2 className="h-12 w-12" />
                    </motion.div>

                    <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Transfer Successful!</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        You successfully sent <strong>{quote?.sourceAmount} {quote?.sourceCurrency}</strong> to <strong>{recipient?.name}</strong>.
                    </p>

                    <div className="mt-8 space-y-3">
                        <Link href="/dashboard" onClick={reset}>
                            <Button className="w-full bg-indigo-600 py-6 text-lg font-semibold hover:bg-indigo-700">
                                <Home className="mr-2 h-5 w-5" />
                                Return to Dashboard
                            </Button>
                        </Link>

                        <Button variant="outline" className="w-full py-6" onClick={() => window.print()}>
                            <FileText className="mr-2 h-5 w-5" />
                            Download Receipt
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
