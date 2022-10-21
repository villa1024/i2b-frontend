import { useEffect, useState } from "react";
import backendApi from "../api/backendApi";

export const useProductById = (id) => {

    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProductById = async () => {
            try {
                const { data } = await backendApi.get(`products/getProductById/${id}`);
                if (!data.ok) {
                    console.log("Producto no encontrado...");
                }
                setProduct(data.product);
            } catch (error) {
                console.log(error);
            }
        };
        getProductById();
    }, [id]);

    return {
        product
    };
};