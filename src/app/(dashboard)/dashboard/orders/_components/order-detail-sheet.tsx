import React from 'react'
import SlideIn from '@/components/motion/slide-in'

interface SlideInProps {
    open: boolean
    onOpenChange: () => void
    order: any
}

export function OrderDetail({ open, onOpenChange, order }: SlideInProps) {
    
    return (
        <SlideIn
            isOpen={open}
            onClose={onOpenChange}
            title='Order Detail'
        >
            <div className='h-full'>
                {order?.id ?? ""}
            </div>
        </SlideIn>
    )
}