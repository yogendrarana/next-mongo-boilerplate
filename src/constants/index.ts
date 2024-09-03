export const unknownError = "An unknown error occurred. Please try again later."

export const redirects = {
    toLogin: "/signin",
    toSignup: "/signup",
    afterLogin: "/dashboard/stores",
    afterLogout: "/",
    toVerify: "/verify-email",
    afterVerify: "/dashboard/stores",
} as const

export const authProviders = {
    google: 'google',
    credentials: 'credentials',
}

// order objects
export const OrderStatus = {
    PROCESSING: 'processing',
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
} as const

export const PaymentMethod = {
    CREDIT_CARD: 'credit_card',
    PAYPAL: 'paypal',
    BANK_TRANSFER: 'bank_transfer',
    CASH_ON_DELIVERY: 'cash_on_delivery',
} as const