'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, UserPlus, Edit, Trash2, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RecipientsPage() {
    const recipients = [
        { id: 1, name: 'John Doe', country: 'Nigeria 🇳🇬', accountNumber: '****5678', bank: 'GTBank' },
        { id: 2, name: 'Maria Garcia', country: 'Philippines 🇵🇭', accountNumber: '****9012', bank: 'BDO' },
        { id: 3, name: 'Rajesh Kumar', country: 'India 🇮🇳', accountNumber: '****3456', bank: 'HDFC Bank' },
        { id: 4, name: 'Sophie Chen', country: 'Kenya 🇰🇪', accountNumber: '****7890', bank: 'M-Pesa' },
    ]

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
                            Recipients
                        </h1>
                        <Link href="/recipients/add">
                            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                                <UserPlus className="mr-2 h-5 w-5" />
                                Add New
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container relative mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-6">
                        {recipients.map((recipient, index) => (
                            <motion.div
                                key={recipient.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-2xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                                                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                                        {recipient.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{recipient.name}</h3>
                                                    <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <MapPin className="h-4 w-4" />
                                                        {recipient.country}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                                                        {recipient.bank} • {recipient.accountNumber}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/recipients/${recipient.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
