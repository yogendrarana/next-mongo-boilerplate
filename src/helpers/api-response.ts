export class ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T | null;

    constructor(success: boolean, message: string, data: T | null = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T = any>(message: string, data: T | null = null): ApiResponse<T> {
        return new ApiResponse(true, message, data);
    }

    static failure(message: string): ApiResponse<null> {
        return new ApiResponse(false, message, null);
    }
}
