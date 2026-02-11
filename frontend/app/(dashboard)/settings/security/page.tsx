
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Smartphone, Shield, LogOut, Key } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SecurityPage() {
    const [biometricsEnabled, setBiometricsEnabled] = useState(true)

    const sessions = [
        { id: 1, device: 'iPhone 13 Pro', location: 'London, UK', active: true, time: 'Current Session' },
        { id: 2, device: 'MacBook Air', location: 'London, UK', active: false, time: 'Last active: 2 days ago' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto max-w-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/settings">
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold">Security</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">

                {/* Password & Authentication */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-indigo-600" />
                            Authentication
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                                <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline">Update</Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Change PIN</p>
                                <p className="text-sm text-gray-500">Used for app access</p>
                            </div>
                            <Button variant="outline">Update</Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Biometric Login</p>
                                    <p className="text-sm text-gray-500">FaceID / TouchID</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                                className={`relative h-6 w-11 rounded-full transition-colors ${biometricsEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${biometricsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* 2FA */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-600" />
                            Two-Factor Authentication
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/10">
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-green-100 p-1 text-green-600 dark:bg-green-900 dark:text-green-400">
                                    <Shield className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-green-800 dark:text-green-400">2FA is Enabled</p>
                                    <p className="text-sm text-green-700 dark:text-green-500">Your account is protected with SMS verification ending in **89</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20">
                            Disable 2FA (Not Recommended)
                        </Button>
                    </CardContent>
                </Card>

                {/* Active Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-gray-500" />
                            Active Sessions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                        <Smartphone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                            {session.device}
                                            {session.active && <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0 h-4 dark:bg-green-900 dark:text-green-400">Current</Badge>}
                                        </p>
                                        <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                                    </div>
                                </div>
                                {!session.active && (
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2">
                            Sign Out All Other Devices
                        </Button>
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}
