import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Separator } from '../ui/separator'

type SlideInProps = {
    children: React.ReactNode
    isOpen: boolean
    duration?: number
    onClose?: () => void
    title: string
}

export default function SlideIn({
    children,
    isOpen,
    duration = 0.3,
    onClose,
    title
}: SlideInProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration, type: "spring" }}
                        className="w-[525px] p-6 bg-transparent fixed top-0 right-0 bottom-0 overflow-y-auto z-50"
                    >
                        <div className='h-full w-full flex flex-col bg-white rounded-lg border' >
                            <div className='px-6 py-4 flex justify-between items-center'>
                                <span className='text-lg font-semibold'>{title}</span>
                                <button onClick={onClose} aria-label="Close" className='p-1.5 hover:bg-gray-100 rounded-full duration-200'>
                                    <X className="h-4 w-4 font-bold" />
                                </button>
                            </div>

                            <Separator />

                            <ScrollArea className="h-full px-6 py-4 ">
                                {children}
                            </ScrollArea>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}