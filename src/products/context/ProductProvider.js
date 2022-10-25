import { useReducer } from "react";
import Swal from "sweetalert2";

import { ProductContext } from "./ProductContext";
import { productReducer } from "./productReducer";
import { types } from "../types/types";
import backendApi from "../api/backendApi";

const initialState = {
    product: {},
    productsList: [],
    ordersList: [],
    openModal: false,
    filterProductsByName: [],
    filterTableByName: [],
    totalPages: 0,
};

export const ProductProvider = ({ children }) => {

    const [productState, dispatch] = useReducer(productReducer, initialState);

    const handleOpenModal = () => {
        dispatch({
            type: types.handleOpenModal
        });
    };

    const handleCloseModal = () => {
        dispatch({
            type: types.handleCloseModal
        });
    };

    const getProductById = async (id) => {
        try {
            const { data } = await backendApi.get(`products/getProductById/${id}`);
            if (!data.ok) {
                console.log("Producto no encontrado...");
            }
            dispatch({
                type: types.getProductById,
                payload: {
                    data: data.product
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getProductsList = async (page = 0) => {
        try {
            const { data } = await backendApi.get(`products/getAll?page=${page}`);
            if (!data.ok) {
                console.log("Error cargando los productos...");
            }
            dispatch({
                type: types.getProductsList,
                payload: {
                    data: data.products.rows
                }
            });
            setFilterProductsByName(data.products.rows);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const getOrdersList = async (page = 0) => {
        try {
            const { data } = await backendApi.get(`products/getAllOrders?page=${page}`);
            if (!data.ok) {
                console.log("Error cargando las ordenes...");
            }
            dispatch({
                type: types.getOrdersList,
                payload: {
                    data: data.orders
                }
            });
            setFilterTableByName(data.orders);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const newOrder = async (date) => {
        try {
            const { data } = await backendApi.post('products/newOrder', {
                product_id: productState.product.id,
                date
            });
            if (data.ok) {
                clearDateValue();
                handleCloseModal();
                Swal.fire(
                    'Creado!',
                    data.msg,
                    'success'
                );
                getProductById(productState.product.id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrder = async (order) => {
        Swal.fire({
            title: order.date.split('-').reverse().join('-'),
            text: "Seguro que desea borrar esta orden? esta acción no puede revertirse...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await backendApi.delete(`products/deleteOrder/${order.id}`);
                if (data.ok) {
                    clearDateValue();
                    handleCloseModal();
                    getProductById(productState.product.id);
                }
                Swal.fire(
                    'Borrada!',
                    data.msg,
                    'success'
                );
            }
        });
    };

    const updateProductInfo = async (e, id, name, price, description) => {
        e.preventDefault();
        try {
            if (name === productState.product.name && parseInt(price) === parseInt(productState.product.price) && description === productState.product.description) {
                return Swal.fire(
                    'Error!',
                    'Debe cambiar algun valor para actualizar producto',
                    'error'
                );
            }
            const { data } = await backendApi.put(`products/editProduct`, {
                id,
                name,
                price,
                description
            });
            if (data.ok) {
                getProductById(productState.product.id);
                Swal.fire(
                    'Actualizado!',
                    data.msg,
                    'success'
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearDateValue = () => {
        dispatch({
            tyep: types.clearDateValue
        });
    };

    const setFilterProductsByName = (data) => {
        dispatch({
            type: types.setFilterProductsByName,
            payload: {
                data
            }
        });
    };

    const setFilterTableByName = (data) => {
        dispatch({
            type: types.setFilterTableByName,
            payload: {
                data
            }
        });
    };

    const setTotalPages = (totalPages) => {
        dispatch({
            type: types.setTotalPages,
            payload: {
                totalPages
            }
        });
    };

    return (
        <ProductContext.Provider value={{
            ...productState,

            handleOpenModal,
            handleCloseModal,

            setFilterProductsByName,
            setFilterTableByName,

            getProductById,
            getProductsList,
            getOrdersList,
            newOrder,
            deleteOrder,
            updateProductInfo,
        }}>
            {children}
        </ProductContext.Provider>
    );
};