import { types } from "../types/types";

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case types.getProductById:
            const { id, name, price, description, orders } = action.payload.data;
            return {
                ...state,
                product: {
                    id,
                    name,
                    price,
                    description,
                    orders
                }
            };
        case types.getProductsList:
            return {
                ...state,
                productsList: action.payload.data
            };
        case types.getOrdersList:
            return {
                ...state,
                ordersList: action.payload.data
            };
        case types.handleOpenModal:
            return {
                ...state,
                openModal: true
            };
        case types.handleCloseModal:
            return {
                ...state,
                openModal: false
            };
        case types.setFilterProductsByName:
            return {
                ...state,
                filterProductsByName: action.payload.data
            };
        case types.setFilterTableByName:
            return {
                ...state,
                filterTableByName: action.payload.data
            };
        case types.setTotalPages:
            return {
                ...state,
                totalPages: action.payload.totalPages
            };

        default:
            return state;
    }
};