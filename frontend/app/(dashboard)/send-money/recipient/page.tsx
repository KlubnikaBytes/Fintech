
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, User, ChevronRight, Check, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useSendMoneyStore } from '@/hooks/use-send-money-store'

export default function RecipientPage() {
    const router = useRouter()
    const { quote, setRecipient } = useSendMoneyStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddingRecipient, setIsAddingRecipient] = useState(false)
    const [newRecipientName, setNewRecipientName] = useState('')
    const [newRecipientBank, setNewRecipientBank] = useState('')
    const [newRecipientAccount, setNewRecipientAccount] = useState('')

    // Mock recipients for selection
    const [savedRecipients, setSavedRecipients] = useState([
        { id: 1, name: 'John Doe', country: 'Nigeria 🇳🇬', accountNumber: '****5678', bank: 'GTBank' },
        { id: 2, name: 'Maria Garcia', country: 'Philippines 🇵🇭', accountNumber: '****9012', bank: 'BDO' },
        { id: 3, name: 'Sarah Wilson', country: 'Kenya 🇰🇪', accountNumber: '****3456', bank: 'M-Pesa' },
    ])

    const filteredRecipients = savedRecipients.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.bank.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelectRecipient = (recipient: any) => {
        setRecipient(recipient)
        router.push('/send-money/confirm')
    }

    const handleAddRecipient = () => {
        if (!newRecipientName || !newRecipientBank || !newRecipientAccount) return

        const newRecipient = {
            id: savedRecipients.length + 1,
            name: newRecipientName,
            country: 'Unknown 🏳️', // Default for now
            accountNumber: `****${newRecipientAccount.slice(-4)}`,
            bank: newRecipientBank
        }

        setSavedRecipients([newRecipient, ...savedRecipients])
        handleSelectRecipient(newRecipient)
        setIsAddingRecipient(false)
    }

    // Redirect if no quote (user jumped here directly)
    if (!quote) {
        router.push('/send-money')
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto flex h-12 items-center justify-between">
                    <Link href="/send-money">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold">Select Recipient</h1>
                    <div className="w-16" />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-lg">
                    {/* Steps Indicator */}
                    <div className="mb-8 flex justify-center gap-2">
                        <div className="h-2 w-8 rounded-full bg-indigo-600"></div>
                        <div className="h-2 w-8 rounded-full bg-indigo-600"></div>
                        <div className="h-2 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>

                    <div className="space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search name, tag, or email"
                                className="pl-10 text-lg py-6 rounded-2xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Recent/Saved Recipients */}
                        <div>
                            <h3 className="mb-4 font-semibold text-gray-500">Recipients</h3>
                            <div className="space-y-3">
                                <motion.div layout className="space-y-3">
                                    {filteredRecipients.map((rec) => (
                                        <motion.div
                                            key={rec.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSelectRecipient(rec)}
                                            className="cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                                                    <span className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
                                                        {rec.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{rec.name}</h4>
                                                    <p className="text-sm text-gray-500">{rec.bank} •• {rec.accountNumber.slice(-4)}</p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {filteredRecipients.length === 0 && (
                                    <div className="py-8 text-center text-gray-500">
                                        No recipients found
                                    </div>
                                )}

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4 rounded-2xl border-dashed py-8 text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                                    onClick={() => setIsAddingRecipient(true)}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg font-semibold">New Recipient</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Recipient Modal */}
            <Modal
                isOpen={isAddingRecipient}
                onClose={() => setIsAddingRecipient(false)}
                title="Add New Recipient"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <Input
                            placeholder="e.g. John Doe"
                            value={newRecipientName}
                            onChange={(e) => setNewRecipientName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank Name</label>
                        <Input
                            placeholder="e.g. Chase Bank"
                            value={newRecipientBank}
                            onChange={(e) => setNewRecipientBank(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Number</label>
                        <Input
                            placeholder="e.g. 1234567890"
                            value={newRecipientAccount}
                            onChange={(e) => setNewRecipientAccount(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
                        onClick={handleAddRecipient}
                        disabled={!newRecipientName || !newRecipientBank || !newRecipientAccount}
                    >
                        Add & Select
                    </Button>
                </div>
            </Modal>
        </div>
    )
}
