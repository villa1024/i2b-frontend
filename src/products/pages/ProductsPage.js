import { useContext, useEffect } from "react";

import { ProductContext } from "../context/ProductContext";
import { ProductsList } from "../components/products/ProductsList";

export const ProductsPage = () => {

    const {
        productsList,
        getProductsList
    } = useContext(ProductContext);

    useEffect(() => {
        getProductsList();
    }, []);

    if (productsList.length === 0) {
        return <h5>Cargando productos...</h5>
    }

    return (
        <>
            <h1 className="mb-3">Lista de productos</h1>
            <ProductsList
                data={productsList}
                query={getProductsList}
            />
        </>
    );
};