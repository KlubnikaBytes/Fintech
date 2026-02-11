
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Bell, Shield, Globe2, Lock, Sliders } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
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
                            Settings
                        </h1>
                        <div className="w-24" />
                    </div>
                </div>
            </header>

            <main className="container relative mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Menu Items */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Link href="/kyc">
                            <Card className="h-full border-0 shadow-lg transition-transform hover:scale-[1.02]">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Identity Verification</h3>
                                        <p className="text-sm text-gray-500">Increase your limits</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/referrals">
                            <Card className="h-full border-0 shadow-lg transition-transform hover:scale-[1.02]">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                                        <Globe2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Invite Friends</h3>
                                        <p className="text-sm text-gray-500">Earn rewards</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/support" className="md:col-span-2">
                            <Card className="h-full border-0 shadow-lg transition-transform hover:scale-[1.02]">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30">
                                        <Bell className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Help & Support</h3>
                                        <p className="text-sm text-gray-500">Get help with your account</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/settings/security">
                            <Card className="h-full border-0 shadow-lg transition-transform hover:scale-[1.02]">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30">
                                        <Lock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
                                        <p className="text-sm text-gray-500">Password & 2FA</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/settings/preferences">
                            <Card className="h-full border-0 shadow-lg transition-transform hover:scale-[1.02]">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-gray-100 p-3 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                        <Sliders className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Preferences</h3>
                                        <p className="text-sm text-gray-500">Language & Theme</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Profile Section (simplified) */}
                    <Card className="border-0 shadow-lg">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-full bg-gray-100 p-3 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                                <p className="text-sm text-gray-500">john@example.com • +1 234 567 8900</p>
                            </div>
                            <Link href="/settings/profile" className="ml-auto">
                                <Button variant="outline">Edit</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
