import { useEffect, useState } from "react";
import backendApi from "../api/backendApi";

export const useProducts = () => {

    const [products, setProducts] = useState([]);

    const getProductsList = async () => {
        try {
            const { data } = await backendApi.get('products/getAll');
            if (!data.ok) {
                console.log("Error cargando los productos...");
            }
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsList();
    }, []);

    return {
        products
    };
};