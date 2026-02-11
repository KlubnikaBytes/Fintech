'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TransactionsPage() {
    const transactions = [
        { id: 'TX001', recipient: 'John Doe (Nigeria)', amount: 158000, currency: 'NGN', sent: 100, sentCurrency: 'USD', status: 'completed', date: 'Feb 10, 2026 - 3:45 PM' },
        { id: 'TX002', recipient: 'Maria Garcia (Philippines)', amount: 5625, currency: 'PHP', sent: 100, sentCurrency: 'USD', status: 'completed', date: 'Feb 9, 2026 - 11:20 AM' },
        { id: 'TX003', recipient: 'Rajesh Kumar (India)', amount: 8312, currency: 'INR', sent: 100, sentCurrency: 'USD', status: 'processing', date: 'Feb 9, 2026 - 9:15 AM' },
        { id: 'TX004', recipient: 'Sophie Chen (Kenya)', amount: 12950, currency: 'KES', sent: 100, sentCurrency: 'USD', status: 'completed', date: 'Feb 7, 2026 - 2:30 PM' },
        { id: 'TX005', recipient: 'Ahmed Hassan (Nigeria)', amount: 79000, currency: 'NGN', sent: 50, sentCurrency: 'USD', status: 'failed', date: 'Feb 6, 2026 - 5:10 PM' },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
            case 'processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
            case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="h-4 w-4" />
            case 'processing': return <Clock className="h-4 w-4 animate-spin" />
            case 'failed': return <XCircle className="h-4 w-4" />
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            {/* Animated Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
            </div>

            {/* Header */}
            <header className="relative border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80">
                <div className="container mx-auto px-4">
                    <div className="flex h-20 items-center justify-between">
                        <Link href="/dashboard">
                            <Button variant="ghost">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Transactions
                        </h1>
                        <div className="w-24" /> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            <main className="container relative mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="overflow-hidden border-0 shadow-2xl">
                            <CardHeader className="border-b border-gray-200 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white dark:border-gray-800">
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    Transaction History
                                </CardTitle>
                                <p className="text-indigo-100">View all your money transfers</p>
                            </CardHeader>
                            <CardContent className="p-0">
                                {transactions.map((tx, index) => (
                                    <motion.div
                                        key={tx.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={`/transactions/${tx.id}`}
                                            className="block border-b border-gray-200 p-6 transition-colors last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                                                        <TrendingUp className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{tx.recipient}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{tx.id}</p>
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {tx.date}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900 dark:text-white">
                                                        {tx.amount.toLocaleString('en-US')} {tx.currency}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        from ${tx.sent} {tx.sentCurrency}
                                                    </p>
                                                    <Badge
                                                        className={`mt-2 ${getStatusColor(tx.status)}`}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            {getStatusIcon(tx.status)}
                                                            {tx.status}
                                                        </span>
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
