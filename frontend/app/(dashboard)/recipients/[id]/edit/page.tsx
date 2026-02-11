
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, User, Building, CreditCard, Save, Trash2, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditRecipientPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const [isLoading, setIsLoading] = useState(false)

    // Mock data for initial state
    const [formData, setFormData] = useState({
        name: 'John Doe',
        country: 'Nigeria',
        bank: 'GTBank',
        accountNumber: '0123456789'
    })

    const handleSave = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            router.push('/recipients')
        }, 1000)
    }

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this recipient?')) {
            router.push('/recipients')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto max-w-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/recipients">
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold">Edit Recipient</h1>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recipient Details</CardTitle>
                        <CardDescription>Update information for {formData.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option value="Nigeria">Nigeria 🇳🇬</option>
                                    <option value="Ghana">Ghana 🇬🇭</option>
                                    <option value="Kenya">Kenya 🇰🇪</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bank">Bank Name</Label>
                            <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="bank"
                                    value={formData.bank}
                                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="account">Account Number</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="account"
                                    value={formData.accountNumber}
                                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={isLoading}>
                                <Save className="mr-2 h-4 w-4" />
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
