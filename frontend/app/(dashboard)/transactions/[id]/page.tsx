
'use client'

import React from 'react' // Import React to fix the linter error
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle2, XCircle, Share2, Download, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TransactionDetailsPage() {
    const params = useParams()
    const id = params.id as string

    // Mock transaction data
    const transaction = {
        id: id,
        recipient: 'John Doe',
        amount: 158000,
        currency: 'NGN',
        sentAmount: 100,
        sentCurrency: 'USD',
        rate: 1580,
        fee: 0,
        total: 100,
        status: 'completed',
        date: 'Feb 10, 2026',
        time: '3:45 PM',
        deliveryMethod: 'Bank Transfer',
        bankName: 'GTBank',
        accountNumber: '****5678',
        reference: 'REF-839201'
    }

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
            case 'completed': return <CheckCircle2 className="h-5 w-5" />
            case 'processing': return <Clock className="h-5 w-5 animate-spin" />
            case 'failed': return <XCircle className="h-5 w-5" />
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto flex h-12 items-center justify-between">
                    <Link href="/transactions">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold">Transaction Details</h1>
                    <div className="w-16" />
                </div>
            </header>

            <main className="container mx-auto max-w-lg px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="overflow-hidden border-0 shadow-lg">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-center text-white">
                            <div className="mb-4 flex justify-center">
                                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                                    {getStatusIcon(transaction.status)}
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {transaction.amount.toLocaleString()} {transaction.currency}
                            </h2>
                            <p className="mt-1 opacity-90">To {transaction.recipient}</p>
                            <Badge className={`mt-4 ${getStatusColor(transaction.status)} border-0`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                        </div>

                        <CardContent className="space-y-6 p-6">
                            {/* Summary Details */}
                            <div className="space-y-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Sent Amount</span>
                                    <span className="font-medium">{transaction.sentAmount.toFixed(2)} {transaction.sentCurrency}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Exchange Rate</span>
                                    <span className="font-medium">1 {transaction.sentCurrency} = {transaction.rate} {transaction.currency}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Fee</span>
                                    <span className="font-medium">{transaction.fee === 0 ? 'Free' : transaction.fee}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 dark:border-gray-800">
                                    <div className="flex justify-between font-bold">
                                        <span>Total Paid</span>
                                        <span>{transaction.total.toFixed(2)} {transaction.sentCurrency}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Details */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Delivery Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Method</span>
                                        <span className="text-sm font-medium">{transaction.deliveryMethod}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Bank</span>
                                        <span className="text-sm font-medium">{transaction.bankName}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Account</span>
                                        <span className="text-sm font-medium">{transaction.accountNumber}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Reference</span>
                                        <span className="text-sm font-medium font-mono">{transaction.reference}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
                                        <span className="text-sm font-medium">{transaction.date}, {transaction.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <Button variant="outline" className="w-full">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                                <Link href={`/transactions/${id}/receipt`} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Receipt
                                    </Button>
                                </Link>
                            </div>

                            <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Something wrong? Get Help
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}
