import { useEffect, useState } from "react";

import backendApi from "../api/backendApi";
import { ProductsList } from "../components/ProductsList";

export const ProductsPage = () => {

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

    if (products.length === 0) {
        return <h5>Cargando productos...</h5>
    }

    return (
        <>
            <h1>Lista de productos</h1>
            <hr />
            <ProductsList data={products} />
        </>
    );
};