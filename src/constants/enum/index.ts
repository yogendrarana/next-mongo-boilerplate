
// product enums
export enum ProductGenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    UNISEX = 'unisex',
}

// user enums
export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user',
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee'
}

// auth enums
export enum AuthProviderEnum {
    CREDENTIALS = 'credentials',
    GOOGLE = 'google'
}

// cart enums
export enum CartItemQuantityOperation {
    ADD = 'add',
    SUBTRACT = 'subtract',
    SET = 'set'
}

// order enums
export enum OrderStatusEnum {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export enum PaymentMethodEnum {
    CREDIT_CARD = 'credit_card',
    PAYPAL = 'paypal',
    BANK_TRANSFER = 'bank_transfer',
    CASH_ON_DELIVERY = 'cash_on_delivery'
}

// create edit product enums
export enum CreateEditModeEnum {
    CREATE = 'create',
    EDIT = 'edit'
}