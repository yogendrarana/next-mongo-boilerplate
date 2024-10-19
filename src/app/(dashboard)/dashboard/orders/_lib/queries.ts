import { SearchOrdersParamsType } from "./validations";

export const getOrders = async (search: SearchOrdersParamsType) => {
    return {
        success: true,
        message: "",
        data: {
            orders: [],
            pageCount: 0
        }
    };
};
