"use client";

import React, { useState } from 'react'
import SlideIn from '@/components/motion/slide-in'
import { ICustomerBase } from '@/server/db/models/customer-model';

interface CustomerDetailProps {
    open: boolean
    onOpenChange: () => void
    customer: ICustomerBase | null
}

// Mock data for the example

export function CustomerDetailSheet({ open, onOpenChange, customer }: CustomerDetailProps) {

    if (!customer) return null;

    return (
        <SlideIn
            isOpen={open}
            onClose={onOpenChange}
            title='Customer Details'
        >
            Yogendra Rana

        </SlideIn>
    )
}