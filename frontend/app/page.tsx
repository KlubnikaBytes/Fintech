import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingDown, Globe2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Animated Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl animate-[gradient-shift_20s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl animate-[gradient-shift-reverse_25s_ease-in-out_infinite]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                <Globe2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TapTap Send
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-indigo-50 dark:hover:bg-indigo-950">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/50">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container relative mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center gap-2">
            <Badge variant="secondary" className="gap-1.5 px-4 py-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-semibold">Instant Transfer</span>
            </Badge>
            <Badge variant="secondary" className="gap-1.5 px-4 py-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold">Bank-Level Security</span>
            </Badge>
          </div>

          <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Send Money{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Worldwide
            </span>
            <br />
            in Minutes
          </h2>

          <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
            Fast, secure, and transparent international money transfers.
            <br />
            No hidden fees. Best exchange rates guaranteed.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/send-money">
              <Button size="lg" className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-7 text-lg font-semibold shadow-2xl shadow-indigo-500/50 transition-all hover:shadow-3xl hover:shadow-indigo-500/60 sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Send Money Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full rounded-2xl border-2 px-8 py-7 text-lg font-semibold sm:w-auto">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Instant Transfer',
                desc: '2-5 minutes delivery',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Bank-Level Security',
                desc: '256-bit encryption',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: TrendingDown,
                title: 'Best Rates',
                desc: 'No hidden fees',
                gradient: 'from-blue-500 to-indigo-500'
              }
            ].map((feature) => (
              <Card key={feature.title} className="group overflow-hidden border-0 bg-white/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900/50">
                <CardContent className="p-8 text-center">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-20 rounded-3xl border border-gray-200 bg-white/60 p-12 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  180+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Countries Supported</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  $2B+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Money Transferred</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  5M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-gray-200/50 bg-white/80 py-8 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 TapTap Send. All rights reserved. | Powered by Next.js</p>
        </div>
      </footer>
    </div>
  )
}
