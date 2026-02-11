
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Download, Printer, Share2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TransactionReceiptPage() {
    const params = useParams()
    const id = params.id as string

    // Mock transaction data
    const transaction = {
        id: id,
        amount: '158,000.00',
        currency: 'NGN',
        sourceAmount: '100.00',
        sourceCurrency: 'USD',
        rate: '1,580.00',
        fee: '0.00',
        total: '100.00',
        date: 'Feb 10, 2026',
        time: '3:45 PM',
        sender: 'John Doe',
        recipient: 'Jane Smith',
        reference: 'REF-839201',
        status: 'Completed'
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 print:bg-white">
            {/* Header - Hidden in Print */}
            <header className="border-b border-gray-200 bg-white px-4 py-4 print:hidden dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto max-w-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/transactions/${id}`}>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold">Receipt</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handlePrint}>
                            <Printer className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Download className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-lg px-4 py-8 print:p-0">
                <Card className="overflow-hidden border-0 shadow-lg print:shadow-none">
                    <div className="bg-indigo-600 p-8 text-center text-white print:bg-white print:text-black">
                        <div className="mb-4 flex justify-center print:hidden">
                            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                        </div>
                        <h2 className="text-lg font-medium opacity-90 print:text-gray-600">Transfer Successful</h2>
                        <h1 className="mt-2 text-4xl font-bold">
                            {transaction.amount} <span className="text-2xl">{transaction.currency}</span>
                        </h1>
                        <p className="mt-2 text-sm opacity-80 print:text-gray-500">{transaction.date} at {transaction.time}</p>
                    </div>

                    <div className="relative">
                        {/* Jagged edge visual effect for receipt */}
                        <div className="absolute -top-2 left-0 right-0 h-4 bg-[url('/jagged-edge.svg')] bg-repeat-x print:hidden" />

                        <CardContent className="space-y-6 bg-white p-8 dark:bg-gray-950 print:p-0">

                            {/* Key Details */}
                            <div className="grid grid-cols-2 gap-y-4 pt-2">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Sender</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{transaction.sender}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase">Recipient</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{transaction.recipient}</p>
                                </div>
                                <div className="col-span-2 border-b border-dashed border-gray-200 py-2 dark:border-gray-800" />

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Reference</p>
                                    <p className="font-mono font-medium text-gray-900 dark:text-white">{transaction.reference}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase">Status</p>
                                    <p className="font-medium text-green-600">{transaction.status}</p>
                                </div>
                                <div className="col-span-2 border-b border-dashed border-gray-200 py-2 dark:border-gray-800" />

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Exchange Rate</p>
                                    <p className="font-medium text-gray-900 dark:text-white">1 {transaction.sourceCurrency} = {transaction.rate} {transaction.currency}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase">Fee</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{transaction.fee === '0.00' ? 'Free' : transaction.fee}</p>
                                </div>
                            </div>

                            {/* Total Box */}
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900 print:bg-transparent print:border print:border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">Total Paid</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        {transaction.total} {transaction.sourceCurrency}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-6 text-center print:hidden">
                                <p className="text-xs text-gray-400">Transaction ID: {transaction.id}</p>
                                <div className="mt-6 flex justify-center gap-4">
                                    <Button variant="outline" className="w-full" onClick={handlePrint}>
                                        Share Receipt
                                    </Button>
                                </div>
                            </div>

                            {/* Footer for print */}
                            <div className="hidden print:block pt-8 text-center">
                                <p className="text-xs text-gray-400">Generated by Fintech App on {new Date().toLocaleDateString()}</p>
                                <p className="text-xs text-gray-400">www.fintechapp.com</p>
                            </div>

                        </CardContent>
                    </div>
                </Card>
            </main>
        </div>
    )
}
