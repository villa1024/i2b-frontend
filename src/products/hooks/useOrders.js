import { useEffect, useState } from "react";
import backendApi from "../api/backendApi";

export const useOrders = () => {

    const [orders, setOrders] = useState([]);

    const getOrdersList = async () => {
        try {
            const { data } = await backendApi.get('products/getAllOrders');
            if (!data.ok) {
                console.log("Error cargando las ordenes...");
            }
            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrdersList();
    }, []);

    return {
        orders
    };
};