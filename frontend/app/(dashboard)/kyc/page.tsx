
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Upload, Check, Camera, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function KYCPage() {
    const [step, setStep] = useState(1)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = () => {
        setIsUploading(true)
        setTimeout(() => {
            setIsUploading(false)
            setStep(3) // Success
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto flex h-12 items-center justify-between">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold">Identity Verification</h1>
                    <div className="w-16" />
                </div>
            </header>

            <main className="container mx-auto max-w-md px-4 py-12">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="mb-8 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                                    <ShieldCheck className="h-12 w-12" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify your identity</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    To keep your account secure and increase limits, we need to verify a valid government ID.
                                </p>
                            </div>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="space-y-4 p-6">
                                    <h3 className="font-semibold">Accepted Documents:</h3>
                                    <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li>Passport</li>
                                        <li>Driver's License</li>
                                        <li>National ID Card</li>
                                    </ul>
                                    <Button
                                        className="w-full bg-indigo-600 py-6 text-lg hover:bg-indigo-700 mt-4"
                                        onClick={() => setStep(2)}
                                    >
                                        Start Verification
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold">Upload Document</h2>
                                <p className="text-sm text-gray-600">Take a clear photo of your ID</p>
                            </div>

                            <Card className="relative border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
                                    <Camera className="h-8 w-8 text-indigo-600" />
                                </div>
                                <p className="mb-2 font-medium">Click to upload or take photo</p>
                                <p className="text-xs text-gray-500">JPG, PNG or PDF (max 5MB)</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    onChange={() => {
                                        setFile(new File([""], "mock.jpg"))
                                        handleUpload()
                                    }}
                                />
                            </Card>

                            {isUploading && (
                                <div className="mt-8 text-center">
                                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                                    <p className="mt-2 text-sm font-medium text-indigo-600">Verifying...</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <Check className="h-12 w-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Pending</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                We've received your documents. We'll review them and notify you shortly (usually within 5 minutes).
                            </p>
                            <Link href="/dashboard">
                                <Button className="mt-8 w-full bg-gray-900 py-6 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                    Back to Dashboard
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
