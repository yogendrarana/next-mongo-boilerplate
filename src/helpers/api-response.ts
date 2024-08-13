export class ApiResponse {
    success: boolean;
    message: string;
    data: object | any[] | null;

    constructor(success: boolean, message: string, data: object | any[] | null = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(message: string, data: object | any[] | null = null): ApiResponse {
        return new ApiResponse(true, message, data);
    }

    static failure(message: string): ApiResponse {
        return new ApiResponse(false, message, null);
    }
}