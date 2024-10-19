export const unknownError = "An unknown error occurred. Please try again later.";

export const redirects = {
    toLogin: "/signin",
    toSignup: "/signup",
    afterLogin: "/dashboard/stores",
    afterLogout: "/",
    toVerify: "/verify-email",
    afterVerify: "/dashboard/stores"
} as const;

export const authProviders = {
    google: "google",
    credentials: "credentials"
};

// order objects
export const OrderStatus = {
    PROCESSING: "processing",
    PENDING: "pending",
    SUCCESS: "success",
    FAILED: "failed"
} as const;

export const PaymentMethod = {
    ESEWA: "esewa",
    KHALTI: "khalti",
    CASH_ON_DELIVERY: "cod"
} as const;

export const PaymentStatus = {
    PENDING: "pending",
    PAID: "paid",
    FAILED: "failed"
} as const;

// category
export const ProductCategory = {
    CLOTHING: "clothing",
    SHOES: "shoes",
    ACCESSORIES: "accessories"
};

export const ProductGender = {
    MALE: "male",
    FEMALE: "female",
    UNISEX: "unisex"
};
