
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Send, Users, History, Settings, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'

export function MainNav() {
    const pathname = usePathname()
    const { t } = useLanguage()

    // Hide nav on public routes
    // Public routes check removed as this component is now only used in dashboard layout


    const navItems = [
        { name: t('nav.home'), href: '/dashboard', icon: LayoutGrid },
        { name: t('nav.send'), href: '/send-money', icon: Send },
        { name: t('nav.recipients'), href: '/recipients', icon: Users },
        { name: t('nav.history'), href: '/transactions', icon: History },
        { name: t('nav.settings'), href: '/settings', icon: Settings },
    ]

    return (
        <>
            {/* Desktop Sidebar (Hidden on Mobile) */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white/50 px-6 pb-4 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="flex h-16 shrink-0 items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            TapTap Send
                        </h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname.startsWith(item.href)
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        isActive
                                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indigo-400',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={cn(
                                                            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <Link
                                    href="/notifications"
                                    className={cn(
                                        pathname === '/notifications'
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indigo-400',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all'
                                    )}
                                >
                                    <Bell
                                        className={cn(
                                            pathname === '/notifications' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {t('nav.notifications')}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Bottom Navigation (Hidden on Desktop) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 px-6 pb-6 pt-2 backdrop-blur-lg lg:hidden dark:border-gray-800 dark:bg-gray-900/80">
                <nav className="flex justify-between">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 rounded-xl p-2 transition-all",
                                    isActive
                                        ? "text-indigo-600 dark:text-indigo-400"
                                        : "text-gray-500 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400"
                                )}
                            >
                                <div className={cn(
                                    "rounded-full p-1 transition-all",
                                    isActive && "bg-indigo-100 dark:bg-indigo-900/30"
                                )}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}
