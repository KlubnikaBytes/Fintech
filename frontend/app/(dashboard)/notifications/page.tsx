
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Check, Shield, Tag, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'transaction_sent',
            title: 'Money Sent',
            message: 'Your transfer of $100 to John Doe was successful.',
            time: '2 hours ago',
            read: false,
            icon: ArrowUpRight,
            color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
        },
        {
            id: 2,
            type: 'security',
            title: 'New Login',
            message: 'New login detected from iPhone 13 in London, UK.',
            time: '5 hours ago',
            read: false,
            icon: Shield,
            color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        },
        {
            id: 3,
            type: 'promo',
            title: 'Fee-Free Transfer',
            message: 'Send money to Nigeria with 0% fees this weekend!',
            time: '1 day ago',
            read: true,
            icon: Tag,
            color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
        },
        {
            id: 4,
            type: 'transaction_received',
            title: 'Money Received',
            message: 'You added $500 to your wallet via Debit Card.',
            time: '2 days ago',
            read: true,
            icon: ArrowDownLeft,
            color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
                <div className="container mx-auto max-w-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" className="-ml-2">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-xl font-bold">Notifications</h1>
                        </div>
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                            Mark all read
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-6">
                <div className="space-y-4">
                    {/* Today */}
                    <div className="mb-2 px-2 text-sm font-medium text-gray-500">Today</div>
                    {notifications.slice(0, 2).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`border-0 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${!item.read ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-950/50'}`}>
                                <CardContent className="flex gap-4 p-4">
                                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between">
                                            <p className={`font-semibold ${!item.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {item.title}
                                            </p>
                                            <span className="text-xs text-gray-400">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {item.message}
                                        </p>
                                        {!item.read && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300">New</Badge>
                                            </div>
                                        )}
                                    </div>
                                    {!item.read && (
                                        <div className="mt-2 h-2 w-2 rounded-full bg-indigo-600" />
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Earlier */}
                    <div className="mt-8 mb-2 px-2 text-sm font-medium text-gray-500">Earlier</div>
                    {notifications.slice(2).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.05) }}
                        >
                            <Card className="border-0 bg-gray-50/50 shadow-sm transition-colors hover:bg-gray-100/50 dark:bg-gray-950/50 dark:hover:bg-gray-900/50">
                                <CardContent className="flex gap-4 p-4">
                                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between">
                                            <p className="font-medium text-gray-700 dark:text-gray-300">
                                                {item.title}
                                            </p>
                                            <span className="text-xs text-gray-400">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                                            {item.message}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}
