
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, ShieldCheck, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000) // Mock save
    }

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
                        <h1 className="text-xl font-bold">Profile Details</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:from-indigo-900 dark:to-purple-900 dark:text-indigo-300">
                            JD
                        </div>
                        <button className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-2 text-white shadow-lg hover:bg-indigo-700">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/30 dark:text-green-400">
                                <ShieldCheck className="mr-1 h-3 w-3" />
                                Verified Level 2
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Personal Info Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="name" defaultValue="John Doe" className="pl-9" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="email" defaultValue="john.doe@example.com" className="pl-9" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="phone" defaultValue="+1 234 567 8900" className="pl-9" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="address" defaultValue="123 Fintech Street, London, UK" className="pl-9" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Limits Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transfer Limits</CardTitle>
                        <CardDescription>Your current spending limits based on verification level.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Daily Limit</span>
                                <span className="font-medium">$5,000 / $10,000</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                                <div className="h-2 w-1/2 rounded-full bg-indigo-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Monthly Limit</span>
                                <span className="font-medium">$12,450 / $50,000</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                                <div className="h-2 w-1/4 rounded-full bg-purple-600" />
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            <div className="flex gap-2">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p>Need higher limits? Complete <Link href="/kyc" className="font-bold underline">Level 3 Verification</Link> to unlock up to $100,000/month.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-4 pt-4">
                    <Button variant="outline" className="w-full" onClick={() => window.history.back()}>Cancel</Button>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </main>
        </div>
    )
}
