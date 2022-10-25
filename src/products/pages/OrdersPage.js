import { useContext, useEffect, useState } from "react";

import { ProductContext } from "../context/ProductContext";
import { OrdersTable } from "../components/Orders/OrdersTable";

export const OrdersPage = () => {

    const {
        ordersList,
        getOrdersList,
    } = useContext(ProductContext);;

    useEffect(() => {
        getOrdersList();
    }, []);

    if (ordersList.length === 0) {
        return <h5>Cargando ordenes...</h5>
    }

    return (
        <>
            <h1 className="mb-3">Ordenes</h1>
            <OrdersTable
                ordersList={ordersList}
            />
        </>
    );
};