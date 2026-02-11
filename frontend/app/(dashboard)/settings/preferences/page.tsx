
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Globe, DollarSign, Bell, Moon, Sun, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/lib/language-context'
import { Language } from '@/lib/translations'

export default function PreferencesPage() {
    const { theme, setTheme } = useTheme()
    const { language, setLanguage, t } = useLanguage()
    const [mounted, setMounted] = useState(false)
    const [pushEnabled, setPushEnabled] = useState(true)
    const [emailEnabled, setEmailEnabled] = useState(true)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null // or a loading skeleton
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
                        <h1 className="text-xl font-bold">{t('preferences.title')}</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">

                {/* General Settings */}
                <div className="space-y-3">
                    <h2 className="px-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('preferences.general')}</h2>
                    <Card>
                        <CardContent className="divide-y divide-gray-100 p-0 dark:divide-gray-800">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{t('preferences.language')}</p>
                                        <p className="text-sm text-gray-500">App language</p>
                                    </div>
                                </div>
                                <select
                                    className="bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white text-right"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as Language)}
                                >
                                    <option value="en">English (US)</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="zh">中文 (Chinese)</option>
                                    <option value="ja">日本語 (Japanese)</option>
                                    <option value="ar">العربية (Arabic)</option>
                                    <option value="pt">Português</option>
                                    <option value="ru">Русский</option>
                                    <option value="hi">हिन्दी (Hindi)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-400">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{t('preferences.currency')}</p>
                                        <p className="text-sm text-gray-500">For display purposes</p>
                                    </div>
                                </div>
                                <select className="bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white text-right">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications */}
                <div className="space-y-3">
                    <h2 className="px-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">Notifications</h2>
                    <Card>
                        <CardContent className="divide-y divide-gray-100 p-0 dark:divide-gray-800">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                                        <Bell className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                                        <p className="text-sm text-gray-500">Transaction alerts & promos</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPushEnabled(!pushEnabled)}
                                    className={`relative h-6 w-11 rounded-full transition-colors ${pushEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${pushEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                                        <p className="text-sm text-gray-500">Receipts & monthly statements</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEmailEnabled(!emailEnabled)}
                                    className={`relative h-6 w-11 rounded-full transition-colors ${emailEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${emailEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Appearance */}
                <div className="space-y-3">
                    <h2 className="px-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">Appearance</h2>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-yellow-100 p-2 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
                                        <Sun className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                                        <p className="text-sm text-gray-500">Light / Dark mode</p>
                                    </div>
                                </div>
                                <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${theme === 'light' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Light
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Dark
                                    </button>
                                    <button
                                        onClick={() => setTheme('system')}
                                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${theme === 'system' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Auto
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    )
}
